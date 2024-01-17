import { assign, createMachine, fromPromise } from 'xstate';
import { NewFlaggedLabwareLayout, OperationTypeName, ServerErrors } from '../../../types/stan';
import {
  FindPermDataQuery,
  LabwareFieldsFragment,
  LabwareFlaggedFieldsFragment,
  LabwareState,
  Maybe,
  SlideCosting,
  SlotCopyContent,
  SlotCopyDestination,
  SlotCopyMutation,
  SlotCopySource
} from '../../../types/sdk';
import { stanCore } from '../../sdk';

/**
 * Context for SlotCopy Machine
 */

export type Destination = {
  labware: NewFlaggedLabwareLayout;
  slotCopyDetails: SlotCopyDestination;
};

/**
 * Making 'labwareState' field optional thereby allowing to keep a list of source labware without state
 */
export type Source = {
  labware: LabwareFlaggedFieldsFragment;
  labwareState?: LabwareState;
};

export interface SlotCopyContext {
  /**
   * The work number associated with this operation
   */
  workNumber: string;
  /**
   * Operation type
   */
  operationType: OperationTypeName;
  /**
   * Perm data for source labware, if any
   */
  sourceLabwarePermData?: FindPermDataQuery[];
  /**
   * All source labware in slot copy operation
   * 'barcode' is the identifier field
   */
  sources: Array<Source>;
  /**
   * All destination labware in slot copy operation
   * 'id' is the identifier field as the destination is not yet created
   */
  destinations: Array<Destination>;
  /**
   * Results returned from server on slotCopy mutation
   */
  slotCopyResults: Array<LabwareFieldsFragment>;
  /**
   * Errors from server, if any
   */
  serverErrors?: Maybe<ServerErrors>;
}

type UpdateSlotCopyContentType = {
  type: 'UPDATE_SLOT_COPY_CONTENT';
  labware: NewFlaggedLabwareLayout;
  slotCopyContent: Array<SlotCopyContent>;
  anySourceMapped: boolean;
};

type UpdateSourceLabwarePermTime = {
  type: 'UPDATE_SOURCE_LABWARE_PERMTIME';
  labwares: Array<LabwareFlaggedFieldsFragment>;
  destinaton: Destination | undefined;
};

type UpdateDestinationPreBarcode = {
  type: 'UPDATE_DESTINATION_PRE_BARCODE';
  preBarcode: string;
  labware: NewFlaggedLabwareLayout;
};

type UpdateDestinationLabwareType = {
  type: 'UPDATE_DESTINATION_LABWARE_TYPE';
  /**Old labware**/
  labwareToReplace: NewFlaggedLabwareLayout;
  /**New labware**/
  labware: NewFlaggedLabwareLayout;
};
type UpdateDestinationCosting = {
  type: 'UPDATE_DESTINATION_COSTING';
  labware: NewFlaggedLabwareLayout;
  labwareCosting: SlideCosting | undefined;
};
type UpdateDestinationBioState = {
  type: 'UPDATE_DESTINATION_BIO_STATE';
  labware: NewFlaggedLabwareLayout;
  bioState: string;
};

type UpdateDestinationLOTNumber = {
  type: 'UPDATE_DESTINATION_LOT_NUMBER';
  labware: NewFlaggedLabwareLayout;
  lotNumber: string;
  isProbe: boolean;
};

type UpdateSourceLabwareState = {
  type: 'UPDATE_SOURCE_LABWARE_STATE';
  labware: LabwareFlaggedFieldsFragment;
  labwareState: LabwareState;
};

type UpdateSourceLabware = {
  type: 'UPDATE_SOURCE_LABWARE';
  labware: LabwareFlaggedFieldsFragment[];
};

type UpdateDestinationLabware = {
  type: 'UPDATE_DESTINATION_LABWARE';
  labware: NewFlaggedLabwareLayout[];
};

type FindPermDataEvent = {
  type: 'xstate.done.actor.findPermTime';
  output: {
    findPermTimes: FindPermDataQuery[];
    inputLabwares: LabwareFieldsFragment[];
    destination: Destination | undefined;
  };
};

type SaveEvent = { type: 'SAVE' };

type SlotCopyDoneEvent = {
  type: 'xstate.done.actor.copySlots';
  output: SlotCopyMutation;
};
type SlotCopyErrorEvent = {
  type: 'xstate.error.actor.copySlots';
  error: unknown;
};

export type SlotCopyEvent =
  | { type: 'UPDATE_WORK_NUMBER'; workNumber: string }
  | UpdateSourceLabware
  | UpdateDestinationLabware
  | UpdateSlotCopyContentType
  | UpdateSourceLabwarePermTime
  | UpdateSourceLabwareState
  | UpdateDestinationLabwareType
  | UpdateDestinationPreBarcode
  | UpdateDestinationCosting
  | UpdateDestinationBioState
  | UpdateDestinationLOTNumber
  | SaveEvent
  | FindPermDataEvent
  | SlotCopyDoneEvent
  | SlotCopyErrorEvent;

/**
 * SlotCopy Machine Config
 */

export const slotCopyMachine = createMachine(
  {
    id: 'slotCopy',
    types: {} as {
      context: SlotCopyContext;
      events: SlotCopyEvent;
    },
    context: ({
      input: { workNumber, operationType, sources, destinations, slotCopyResults }
    }: {
      input: SlotCopyContext;
    }): SlotCopyContext => ({
      workNumber,
      operationType,
      sources,
      destinations,
      slotCopyResults
    }),
    initial: 'mapping',
    states: {
      mapping: {
        on: {
          UPDATE_SOURCE_LABWARE: {
            actions: 'assignSourceLabware'
          },
          UPDATE_DESTINATION_LABWARE: {
            actions: 'assignDestinationLabware'
          },
          UPDATE_WORK_NUMBER: {
            actions: 'assignWorkNumber'
          },
          UPDATE_SLOT_COPY_CONTENT: [
            {
              target: 'readyToCopy',
              guard: ({ event }) => event.anySourceMapped,
              actions: ['assignSCC']
            },
            {
              actions: ['assignSCC']
            }
          ],
          UPDATE_SOURCE_LABWARE_PERMTIME: {
            target: 'updateSourceLabwarePermTime'
          },
          UPDATE_SOURCE_LABWARE_STATE: {
            actions: 'assignSourceLabwareState'
          },
          UPDATE_DESTINATION_PRE_BARCODE: {
            actions: 'assignDestinationPreBarcode'
          },
          UPDATE_DESTINATION_LABWARE_TYPE: {
            actions: 'assignDestinationLabwareType'
          },
          UPDATE_DESTINATION_COSTING: {
            actions: 'assignDestinationCosting'
          },
          UPDATE_DESTINATION_BIO_STATE: {
            actions: 'assignDestinationBioState'
          },
          UPDATE_DESTINATION_LOT_NUMBER: {
            actions: 'assignDestinationLOTNumber'
          }
        }
      },
      readyToCopy: {
        on: {
          UPDATE_SOURCE_LABWARE: {
            actions: 'assignSourceLabware'
          },
          UPDATE_DESTINATION_LABWARE: {
            actions: 'assignDestinationLabware'
          },
          UPDATE_WORK_NUMBER: {
            actions: 'assignWorkNumber'
          },
          UPDATE_SLOT_COPY_CONTENT: [
            {
              target: 'mapping',
              guard: ({ event }) => !event.anySourceMapped,
              actions: ['assignSCC']
            },
            {
              actions: ['assignSCC']
            }
          ],
          UPDATE_SOURCE_LABWARE_PERMTIME: {
            target: 'updateSourceLabwarePermTime'
          },
          UPDATE_SOURCE_LABWARE_STATE: {
            actions: 'assignSourceLabwareState'
          },
          UPDATE_DESTINATION_PRE_BARCODE: {
            actions: 'assignDestinationPreBarcode'
          },
          UPDATE_DESTINATION_LABWARE_TYPE: {
            actions: 'assignDestinationLabwareType'
          },
          UPDATE_DESTINATION_COSTING: {
            actions: 'assignDestinationCosting'
          },
          UPDATE_DESTINATION_BIO_STATE: {
            actions: 'assignDestinationBioState'
          },
          UPDATE_DESTINATION_LOT_NUMBER: {
            actions: 'assignDestinationLOTNumber'
          },
          SAVE: 'copying'
        }
      },
      copying: {
        entry: ['emptyServerError'],
        id: 'copySlots',
        invoke: {
          src: fromPromise(({ input }) =>
            stanCore.SlotCopy({
              request: {
                workNumber: input.workNumber,
                operationType: input.operationType,
                destinations: input.destinations.map((dest: Destination) => dest.slotCopyDetails),
                sources: input.sources.reduce((arr: SlotCopySource[], curr: Source) => {
                  if (curr.labwareState) {
                    arr.push({ barcode: curr.labware.barcode, labwareState: curr.labwareState });
                  }
                  return arr;
                }, [])
              }
            })
          ),
          input: ({ context }) => ({
            workNumber: context.workNumber,
            operationType: context.operationType,
            destinations: context.destinations,
            sources: context.sources
          }),
          onDone: {
            target: 'copied',
            actions: ['assignResult']
          },
          onError: {
            target: 'readyToCopy',
            actions: ['assignServerError']
          }
        }
      },
      updateSourceLabwarePermTime: {
        invoke: {
          id: 'findPermTime',
          src: fromPromise(async ({ input }) => {
            const findPermDataQueries: FindPermDataQuery[] = [];
            for (const inputlw of input.labwares) {
              if (
                !input.sourceLabwarePermData?.some(
                  (permData: FindPermDataQuery) => permData.visiumPermData.labware.barcode === inputlw.barcode
                )
              ) {
                const val = await stanCore.FindPermData({ barcode: inputlw.barcode });
                findPermDataQueries.push(val);
              }
            }
            return {
              findPermTimes: findPermDataQueries,
              inputLabwares: input.labwares,
              destination: input.destinaton
            };
          }),
          input: ({ context, event }) => ({
            labwares: (event as UpdateSourceLabwarePermTime).labwares,
            destinaton: (event as UpdateSourceLabwarePermTime).destinaton,
            sourceLabwarePermData: context.sourceLabwarePermData
          }),
          onDone: [
            {
              target: 'readyToCopy',
              guard: ({ event }) => {
                if (event.output.inputLabwares.length > 0) {
                  return (
                    event.output.destination !== undefined &&
                    event.output.destination.slotCopyDetails.contents.length > 0
                  );
                } else {
                  return false;
                }
              },
              actions: 'assignSourceLabwarePermTimes'
            },
            {
              target: 'mapping',
              actions: 'assignSourceLabwarePermTimes'
            }
          ]
        }
      },
      copied: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      assignSourceLabware: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_SOURCE_LABWARE') {
          return context;
        }
        context.sources = event.labware.map((newSource) => {
          const source = context.sources.find((src) => src.labware.barcode === newSource.barcode);
          //There is no source exists , so add this
          if (!source) {
            return {
              labware: newSource
            };
          } else {
            return source;
          }
        });
        return context;
      }),
      assignDestinationLabware: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_LABWARE') {
          return context;
        }
        context.destinations = event.labware.map((newDest) => {
          const destination = context.destinations.find((dest) => dest.labware.id === newDest.id);
          //There is no destination exists , so add this
          if (!destination) {
            return {
              labware: newDest,
              slotCopyDetails: { labwareType: newDest.labwareType.name, barcode: newDest.barcode, contents: [] }
            };
          } else {
            return destination;
          }
        });
        return context;
      }),

      assignSCC: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_SLOT_COPY_CONTENT') {
          return context;
        }
        const destination = context.destinations.find((dest) => dest.labware.id === event.labware.id);
        if (destination) {
          destination.slotCopyDetails.contents = event.slotCopyContent;
        }
        return context;
      }),

      assignResult: assign(({ context, event }) => {
        if (event.type !== 'xstate.done.actor.copySlots') {
          return context;
        }
        context.slotCopyResults = event.output.slotCopy.labware;
        return context;
      }),

      assignServerError: assign(({ context, event }) => {
        if (event.type !== 'xstate.error.actor.copySlots') {
          return context;
        }
        context.serverErrors = event.error as ServerErrors;
        return context;
      }),

      assignWorkNumber: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_WORK_NUMBER') return context;
        context.workNumber = event.workNumber;
        return context;
      }),
      assignSourceLabwarePermTimes: assign(({ context, event }) => {
        if (event.type !== 'xstate.done.actor.findPermTime') return context;
        //Sync the permData array with current input labware list
        context.sourceLabwarePermData = context.sourceLabwarePermData?.filter((permData) =>
          event.output.inputLabwares.some((lw) => lw.barcode === permData.visiumPermData.labware.barcode)
        );
        //Add newly fetched perm times if any
        event.output.findPermTimes.forEach((permData) => {
          context.sourceLabwarePermData?.push(permData);
        });

        //update slot copy content with updated labware
        context.destinations.forEach((dest) => {
          dest.slotCopyDetails.contents = dest.slotCopyDetails.contents.filter((scc) =>
            event.output.inputLabwares.some((lw) => lw.barcode === scc.sourceBarcode)
          );
        });
        return context;
      }),
      assignDestinationBioState: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_BIO_STATE') return context;
        const destination = context.destinations.find((dest) => dest.labware.id === event.labware.id);
        if (!destination) {
          return context;
        }
        destination.slotCopyDetails.bioState = event.bioState;
        return context;
      }),
      assignDestinationPreBarcode: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_PRE_BARCODE') return context;
        const destination = context.destinations.find((dest) => dest.labware.id === event.labware.id);
        if (!destination) {
          return context;
        }
        //update barcode in destination labware and in slotCopy details
        destination.labware.barcode = event.preBarcode;
        destination.slotCopyDetails.preBarcode = event.preBarcode;
        return context;
      }),
      assignDestinationLabwareType: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_LABWARE_TYPE') return context;
        const destination = context.destinations.find((dest) => dest.labware.id === event.labwareToReplace.id);
        if (!destination || destination.labware.labwareType.name === event.labware.labwareType.name) {
          return context;
        }
        destination.labware = event.labware;
        destination.slotCopyDetails = {
          ...destination.slotCopyDetails,
          labwareType: event.labware.labwareType.name,
          contents: []
        };
        return context;
      }),
      assignDestinationCosting: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_COSTING') return context;
        const destination = context.destinations.find((dest) => dest.labware.id === event.labware.id);
        if (!destination) {
          return context;
        }
        destination.slotCopyDetails.costing = event.labwareCosting;
        return context;
      }),
      assignDestinationLOTNumber: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_DESTINATION_LOT_NUMBER') return context;
        const destination = context.destinations.find((dest) => dest.labware.id === event.labware.id);
        if (!destination) {
          return context;
        }
        if (event.isProbe) {
          destination.slotCopyDetails.probeLotNumber = event.lotNumber;
        } else {
          destination.slotCopyDetails.lotNumber = event.lotNumber;
        }
        return context;
      }),
      assignSourceLabwareState: assign(({ context, event }) => {
        if (event.type !== 'UPDATE_SOURCE_LABWARE_STATE') return context;
        const src = context.sources.find((src) => src.labware.barcode === event.labware.barcode);
        if (src) {
          src.labwareState = event.labwareState;
        } else {
          context.sources.push({ labware: event.labware, labwareState: event.labwareState });
        }
        return context;
      }),
      emptyServerError: assign(({ context }) => {
        context.serverErrors = null;
        return context;
      })
    }
  }
);

export default slotCopyMachine;
