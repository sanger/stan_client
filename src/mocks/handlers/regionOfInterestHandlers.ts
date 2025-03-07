import { graphql, HttpResponse } from 'msw';
import {
  GetRegionsOfInterestQuery,
  GetRegionsOfInterestQueryVariables,
  GetRunRoisQuery,
  GetRunRoisQueryVariables,
  LabwareRoi,
  RecordMetricsMutation,
  RecordMetricsMutationVariables
} from '../../types/sdk';
import { createLabware } from './labwareHandlers';
import { faker } from '@faker-js/faker';

const regionOfInterestHandlers = [
  graphql.query<GetRegionsOfInterestQuery, GetRegionsOfInterestQueryVariables>(
    'GetRegionsOfInterest',
    ({ variables }) => {
      const barcodes = Array.isArray(variables.barcodes) ? variables.barcodes : [variables.barcodes];
      const regionsOfInterests: LabwareRoi[] = [];
      barcodes.forEach((barcode) => {
        const labware = createLabware(barcode);
        const regionsOfInterest: LabwareRoi = {
          barcode: labware.barcode,
          rois: labware.slots.flatMap((slot) =>
            slot.samples.map((sample) => ({
              slotId: slot.id,
              operationId: faker.number.int(19),
              sample,
              address: slot.address,
              roi: faker.helpers.arrayElement(['top left', 'top right', 'bottom left', 'bottom right', 'center'])
            }))
          )
        };
        regionsOfInterests.push(regionsOfInterest);
      });
      return HttpResponse.json({ data: { rois: regionsOfInterests } }, { status: 200 });
    }
  ),

  graphql.query<GetRunRoisQuery, GetRunRoisQueryVariables>('GetRunRois', ({ variables }) => {
    const labware = createLabware(variables.barcode);
    const rois = labware.slots.flatMap((slot) =>
      slot.samples.map((sample) => ({
        sample,
        address: slot.address,
        roi: faker.helpers.arrayElement(['top left', 'top right', 'bottom left', 'bottom right', 'center'])
      }))
    );
    return HttpResponse.json({ data: { runRois: rois } }, { status: 200 });
  }),

  graphql.mutation<RecordMetricsMutation, RecordMetricsMutationVariables>('RecordMetrics', () => {
    return HttpResponse.json({ data: { recordSampleMetrics: { operations: [{ id: 1 }] } } }, { status: 200 });
  })
];

export default regionOfInterestHandlers;
