import { createMachine } from "xstate";
import * as Yup from "yup";
import {
  FindLabwareQuery,
  GetLabwareInLocationQuery,
  LabwareFieldsFragment,
  Maybe,
} from "../../../types/sdk";
import { assign } from "@xstate/immer";
import { stanCore } from "../../sdk";
import { ClientError } from "graphql-request";
import { findIndex } from "lodash";

export interface LabwareContext {
  /**
   * The current barcode we're working with
   */
  currentBarcode: string;

  /**
   * The labware loaded from a scanned barcode
   */
  foundLabware: Maybe<LabwareFieldsFragment>;

  /**
   * The list of sourceLabwares fetched so far
   */
  labwares: LabwareFieldsFragment[];

  /**
   * The most recently removed labware
   */
  removedLabware: Maybe<{ labware: LabwareFieldsFragment; index: number }>;

  /**
   * A {@link https://github.com/jquense/yup#string Yup string schema} to validate the barcode on submission
   */
  validator: Yup.StringSchema;

  /**
   * A function that checks if the given item of found labware may be added to the given existing labware
   * @param labwares the labware already entered
   * @param foundLabware the new labware to be entered
   * @return a list of any problems identified
   */
  foundLabwareCheck: (
    labwares: LabwareFieldsFragment[],
    foundLabware: LabwareFieldsFragment
  ) => string[];

  /**
   * The current success message
   */
  successMessage: Maybe<string>;

  /**
   * The current error message
   */
  errorMessage: Maybe<string>;

  /**
   * Flag for Location barcode scan. If true, it will be  a location barcode scan, else a labware scan
   */
  locationScan?: boolean;
}

/**
 * Event to be called whenever the barcode changes
 */
type UpdateCurrentBarcodeEvent = {
  type: "UPDATE_CURRENT_BARCODE";
  value: string;
  locationScan?: boolean;
};

/**
 * Event to be called when current barcode is to be submitted
 */
type SubmitBarcodeEvent = { type: "SUBMIT_BARCODE" };

/**
 * Event to be called to remove a piece of labware from context
 */
type RemoveLabwareEvent = { type: "REMOVE_LABWARE"; value: string };

/**
 * Event to be called when machine is to be locked
 */
type LockEvent = { type: "LOCK" };

/**
 * Event to unlock the machine
 */
type UnlockEvent = { type: "UNLOCK" };

type ValidationErrorEvent = {
  type: "error.platform.validateBarcode";
  data: Yup.ValidationError;
};

type FindLocationDoneEvent = {
  type: "done.invoke.findLocation";
  data: GetLabwareInLocationQuery;
};

type FindLocationErrorEvent = {
  type: "error.platform.findLocation";
  data: ClientError;
};
type FindLabwareDoneEvent = {
  type: "done.invoke.findLabware";
  data: FindLabwareQuery;
};

type FindLabwareErrorEvent = {
  type: "error.platform.findLabware";
  data: ClientError;
};

type AddFoundLabwareEvent = {
  type: "done.invoke.validateFoundLabware";
  data: LabwareFieldsFragment;
};

type FoundLabwareCheckErrorEvent = {
  type: "error.platform.validateFoundLabware";
  data: string[];
};

export type LabwareEvents =
  | UpdateCurrentBarcodeEvent
  | SubmitBarcodeEvent
  | RemoveLabwareEvent
  | LockEvent
  | UnlockEvent
  | ValidationErrorEvent
  | FindLabwareDoneEvent
  | FindLabwareErrorEvent
  | FindLocationDoneEvent
  | FindLocationErrorEvent
  | AddFoundLabwareEvent
  | FoundLabwareCheckErrorEvent;

/**
 * State machine for managing a collection of {@link Labware Labwares}
 *
 * @see {@link https://xstate.js.org/docs/guides/machines.html#configuration}
 *
 * @example
 * const machine = interpret(labwareMachine);
 * machine.start();
 * machine.send({ type: "UPDATE_CURRENT_BARCODE", value: "STAN-123" });
 * machine.send({ type: "SUBMIT_BARCODE" });
 *
 * @example Overriding the default validator to require a minimum length of 3
 * const machine = interpret(labwareMachine.withContext(
 *   Object.assign({}, labwareMachine.context, { validator: Yup.string().min(3).required("Barcode is required") })
 * )
 */
export const createLabwareMachine = (
  labwares: LabwareFieldsFragment[] = [],
  foundLabwareCheck?: (
    labwares: LabwareFieldsFragment[],
    foundLabware: LabwareFieldsFragment
  ) => string[]
) =>
  createMachine<LabwareContext, LabwareEvents>(
    {
      context: {
        currentBarcode: "",
        foundLabware: null,
        labwares,
        removedLabware: null,
        foundLabwareCheck: foundLabwareCheck ?? (() => []),
        validator: Yup.string().trim().required("Barcode is required"),
        successMessage: null,
        errorMessage: null,
        locationScan: false,
      },
      id: "labwareScanner",
      initial: "idle",
      states: {
        idle: {
          initial: "normal",
          states: {
            normal: {},
            error: {},
            success: {},
          },
          on: {
            UPDATE_CURRENT_BARCODE: {
              target: "#labwareScanner.idle.normal",
              actions: "assignCurrentBarcode",
            },
            SUBMIT_BARCODE: [
              // If `barcodeNotPresent` returns true, transition to `validating`
              {
                target: "validating",
                cond: "barcodeNotPresent",
              },
              // If `barcodeNotPresent` returned false, machine transitions here
              {
                target: "#labwareScanner.idle.error",
                actions: "assignErrorMessage",
              },
            ],
            REMOVE_LABWARE: {
              target: "#labwareScanner.idle.success",
              actions: ["removeLabware"],
            },
            LOCK: "locked",
          },
        },
        locked: {
          on: { UNLOCK: "idle" },
        },
        validating: {
          invoke: {
            id: "validateBarcode",
            src: "validateBarcode",
            onDone: [
              //If it is location barcode then transition to 'searchingLocation' otherwise to 'searching'
              {
                target: "searching",
                cond: (ctx) => ctx.locationScan === false,
              },
              {
                target: "searchingLocation",
              },
            ],

            onError: {
              target: "#labwareScanner.idle.error",
              actions: "assignValidationError",
            },
          },
        },
        searching: {
          invoke: {
            id: "findLabware",
            src: "findLabwareByBarcode",
            onDone: {
              target: "validatingFoundLabware",
              actions: ["assignFoundLabware"],
            },
            onError: {
              target: "#labwareScanner.idle.error",
              actions: "assignFindError",
            },
          },
        },
        searchingLocation: {
          invoke: {
            id: "findLocation",
            src: "findLabwareInLocation",
            onDone: {
              target: "#labwareScanner.idle.normal",
              actions: ["assignFoundLocationLabwareIfValid"],
            },
            onError: {
              target: "#labwareScanner.idle.error",
              actions: "assignFindError",
            },
          },
        },
        validatingFoundLabware: {
          invoke: {
            id: "validateFoundLabware",
            src: "validateFoundLabware",
            onDone: {
              target: "#labwareScanner.idle.normal",
              actions: ["foundEvent", "addFoundLabware"],
            },
            onError: {
              target: "#labwareScanner.idle.error",
              actions: ["foundLabwareCheckError"],
            },
          },
        },
      },
    },
    {
      actions: {
        assignCurrentBarcode: assign((ctx, e) => {
          if (e.type !== "UPDATE_CURRENT_BARCODE") {
            return;
          }
          ctx.currentBarcode = e.value.replace(/\s+/g, "");

          //change of scanning type between location and labware, so initialise the listed labware, if any as well error messages.
          if (ctx.locationScan !== e.locationScan) {
            ctx.labwares = [];
            ctx.errorMessage = "";
          }

          ctx.locationScan = e.locationScan;
        }),

        assignErrorMessage: assign((ctx, e) => {
          if (e.type !== "SUBMIT_BARCODE") {
            return;
          }
          ctx.errorMessage = `"${ctx.currentBarcode}" has already been scanned`;
        }),

        removeLabware: assign((ctx, e) => {
          if (e.type !== "REMOVE_LABWARE") {
            return;
          }
          const removeLabwareIndex = findIndex(ctx.labwares, {
            barcode: e.value,
          });

          if (removeLabwareIndex < 0) return;

          ctx.removedLabware = {
            labware: ctx.labwares[removeLabwareIndex],
            index: removeLabwareIndex,
          };
          ctx.labwares.splice(removeLabwareIndex, 1);
          ctx.successMessage = `"${e.value}" removed`;
        }),

        assignValidationError: assign((ctx, e) => {
          if (e.type !== "error.platform.validateBarcode") {
            return;
          }
          ctx.errorMessage = e.data.errors.join("\n");
        }),

        assignFoundLabware: assign((ctx, e) => {
          if (e.type !== "done.invoke.findLabware") {
            return;
          }
          ctx.foundLabware = e.data.labware;
          ctx.currentBarcode = "";
        }),

        addFoundLabware: assign((ctx, e) => {
          if (e.type !== "done.invoke.validateFoundLabware") {
            return;
          } else ctx.labwares.push(e.data);
          ctx.foundLabware = null;
        }),

        assignFoundLocationLabwareIfValid: assign((ctx, e) => {
          if (e.type !== "done.invoke.findLocation") {
            return;
          }
          const problems: string[] = [];
          /*Validate all the labwares in the location using the validation function passed.
           If validation is success, add that labware to the list of labwares, otherwise add the error message
           for failure in context */
          e.data.labwareInLocation.forEach((labware) => {
            const problem = ctx.foundLabwareCheck(
              e.data.labwareInLocation,
              labware
            );
            if (problem.length !== 0) problems.push(problem.join("\n"));
            else ctx.labwares.push(labware);
          });
          if (problems.length > 0) {
            ctx.errorMessage = problems.join("\n");
          }
          ctx.currentBarcode = "";
        }),

        // No-op. Can be overidden when creating the machine.
        foundEvent: () => {},

        foundLabwareCheckError: assign((ctx, e) => {
          if (e.type !== "error.platform.validateFoundLabware") {
            return;
          }
          ctx.errorMessage = e.data.join("\n");
        }),

        assignFindError: assign((ctx, e) => {
          if (
            e.type !== "error.platform.findLabware" &&
            e.type !== "error.platform.findLocation"
          ) {
            return;
          }
          const matchResult = e.data.message.match(/^.*\s:\s(.*)$/);
          if (matchResult && matchResult.length > 1) {
            ctx.errorMessage = matchResult[1];
          }
        }),
      },
      guards: {
        barcodeNotPresent: (ctx: LabwareContext, _e) => {
          return !ctx.labwares
            .map((lw) => lw.barcode)
            .includes(ctx.currentBarcode);
        },
      },
      services: {
        findLabwareByBarcode: (ctx: LabwareContext) => {
          return stanCore.FindLabware({ barcode: ctx.currentBarcode });
        },
        findLabwareInLocation: (ctx: LabwareContext) => {
          return stanCore.GetLabwareInLocation({
            locationBarcode: ctx.currentBarcode,
          });
        },
        validateBarcode: (ctx: LabwareContext) =>
          ctx.validator.validate(ctx.currentBarcode),
        validateFoundLabware: (ctx: LabwareContext) => {
          return new Promise((resolve, reject) => {
            const problems = ctx.foundLabware
              ? ctx.foundLabwareCheck(ctx.labwares, ctx.foundLabware)
              : ["Labware not loaded."];
            if (problems.length === 0) {
              resolve(ctx.foundLabware);
            } else {
              reject(problems);
            }
          });
        },
      },
    }
  );
