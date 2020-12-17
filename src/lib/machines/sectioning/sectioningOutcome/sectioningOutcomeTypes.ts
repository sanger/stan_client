import { ActorRef, Interpreter } from "xstate";
import { LayoutPlan } from "../../layout/layoutContext";
import {
  Comment,
  ConfirmOperationLabware,
  LabwareLayoutFragment as LabwareLayout,
} from "../../../../types/graphql";
import { Address } from "../../../../types/stan";

export type SectioningOutcomeMachineType = Interpreter<
  SectioningOutcomeContext,
  SectioningOutcomeSchema,
  SectioningOutcomeEvent
>;

export type SectioningOutcomeActorRef = ActorRef<
  SectioningOutcomeEvent,
  SectioningOutcomeMachineType["state"]
>;

//region State
export enum State {
  INIT = "init",
  CANCELLABLE_MODE = "cancellableMode",
  EDITABLE_MODE = "editableMode",
  EDITING_LAYOUT = "editingLayout",
}

export interface SectioningOutcomeSchema {
  states: {
    [State.INIT]: {};
    [State.CANCELLABLE_MODE]: {};
    [State.EDITABLE_MODE]: {};
    [State.EDITING_LAYOUT]: {};
  };
}
//endregion

//region Context
export interface SectioningOutcomeContext {
  /**
   * The layout plan created in the plan stage
   */
  originalLayoutPlan: LayoutPlan;

  /**
   * The current layout (some sections may have not been done in the end)
   */
  layoutPlan: LayoutPlan;

  /**
   * The destination labware
   */
  labware: LabwareLayout;

  /**
   * All comments available for the outcome confirmation
   */
  comments: Array<Comment>;

  /**
   * Map of labware address to comment ID
   */
  addressToCommentMap: Map<Address, number>;

  /**
   * Has this labware been cancelled (relevant only for tubes)
   */
  cancelled: boolean;

  /**
   * Addresses of slots that for some reason couldn't be used
   */
  cancelledAddresses: Array<Address>;
}
//endregion

//region Events
type SetCommentForAddressEvent = {
  type: "SET_COMMENT_FOR_ADDRESS";
  address: string;
  commentId: string;
};

type SetCommentForAllEvent = {
  type: "SET_COMMENT_FOR_ALL";
  commentId: string;
};

type EditLayoutEvent = { type: "EDIT_LAYOUT" };

type CancelEditLayoutEvent = { type: "CANCEL_EDIT_LAYOUT" };

type DoneEditLayoutEvent = { type: "DONE_EDIT_LAYOUT" };

export type LayoutMachineDone = {
  type: "done.invoke.layoutMachine";
  data: { layoutPlan: LayoutPlan };
};

type ToggleCancelEvent = { type: "TOGGLE_CANCEL" };

export type CommitConfirmationEvent = {
  type: "COMMIT_CONFIRMATION";
  confirmOperationLabware: ConfirmOperationLabware;
};

export type SectioningOutcomeEvent =
  | SetCommentForAddressEvent
  | SetCommentForAllEvent
  | EditLayoutEvent
  | CancelEditLayoutEvent
  | DoneEditLayoutEvent
  | LayoutMachineDone
  | ToggleCancelEvent
  | CommitConfirmationEvent;
//endregion
