/**
 * Default handlers for the mock API
 */
import labwareHandlers from "./handlers/labwareHandlers";
import planHandlers from "./handlers/planHandlers";
import printHandlers from "./handlers/printHandlers";
import registrationHandlers from "./handlers/registrationHandlers";
import sectioningHandlers from "./handlers/sectioningHandlers";
import userHandlers from "./handlers/userHandlers";
import locationHandlers from "./handlers/locationHandlers";
import releaseHandlers from "./handlers/releaseHandlers";
import extractionHandlers from "./handlers/extractionHandlers";
import findHandlers from "./handlers/findHandlers";
import destroyHandlers from "./handlers/destroyHandlers";
import slotCopyHandlers from "./handlers/slotCopyHandlers";
import destructionReasonHandlers from "./handlers/destructionReasonHandlers";
import commentHandlers from "./handlers/commentHandlers";
import hmdmcHandlers from "./handlers/hmdmcHandlers";
import releaseDestinationHandlers from "./handlers/releaseDestinationHandlers";
import releaseRecipientHandlers from "./handlers/releaseRecipientHandlers";
import speciesHandlers from "./handlers/speciesHandlers";
import configurationHandlers from "./handlers/configurationHandlers";
import historyHandlers from "./handlers/historyHandlers";
import projectHandlers from "./handlers/projectHandlers";
import costCodeHandlers from "./handlers/costCodeHandlers";
import workHandlers from "./handlers/workHandlers";
import workTypeHandlers from "./handlers/workTypeHandlers";
import stainingHandlers from "./handlers/stainingHandlers";
import equipmentHandlers from "./handlers/equipmentHandlers";
import recordInPlaceHandlers from "./handlers/recordInPlaceHandlers";
import workProgressHandlers from "./handlers/workProgressHandlers";
import stainingQCHandlers from "./handlers/stainingQCHandlers";
import extractionResultHandlers from "./handlers/extractionResultHandlers";
import recordRnaAnalysisHandlers from "./handlers/recordRnaAnalysisHandlers";
import unreleaseHandlers from "./handlers/unreleaseHandlers";
import { labwareLocationHandlers } from "./handlers/labwareLocationHandlers";

export const handlers = [
  ...labwareHandlers,
  ...planHandlers,
  ...printHandlers,
  ...registrationHandlers,
  ...sectioningHandlers,
  ...userHandlers,
  ...locationHandlers,
  ...releaseHandlers,
  ...extractionHandlers,
  ...findHandlers,
  ...destroyHandlers,
  ...slotCopyHandlers,
  ...destructionReasonHandlers,
  ...commentHandlers,
  ...hmdmcHandlers,
  ...releaseDestinationHandlers,
  ...releaseRecipientHandlers,
  ...speciesHandlers,
  ...configurationHandlers,
  ...historyHandlers,
  ...projectHandlers,
  ...costCodeHandlers,
  ...workHandlers,
  ...workTypeHandlers,
  ...stainingHandlers,
  ...equipmentHandlers,
  ...recordInPlaceHandlers,
  ...workProgressHandlers,
  ...stainingQCHandlers,
  ...extractionResultHandlers,
  ...recordRnaAnalysisHandlers,
  ...unreleaseHandlers,
  ...labwareLocationHandlers,
];
