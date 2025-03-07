import { graphql, HttpResponse } from 'msw';
import {
  AddBioRiskMutation,
  AddBioRiskMutationVariables,
  GetBioRisksQuery,
  GetBioRisksQueryVariables,
  GetLabwareBioRiskCodesQuery,
  GetLabwareBioRiskCodesQueryVariables,
  Labware,
  SetBioRiskEnabledMutation,
  SetBioRiskEnabledMutationVariables
} from '../../types/sdk';
import { isEnabled } from '../../lib/helpers';
import bioRiskRepository from '../repositories/bioRiskRepository';
import bioRiskFactory from '../../lib/factories/bioRiskFactory';
import labwareFactory from '../../lib/factories/labwareFactory';

const bioRiskHandler = [
  graphql.mutation<AddBioRiskMutation, AddBioRiskMutationVariables>('AddBioRisk', ({ variables }) => {
    const bioRisk = bioRiskFactory.build({
      code: variables.code
    });
    bioRiskRepository.save(bioRisk);
    return HttpResponse.json({ data: { addBioRisk: bioRisk } }, { status: 200 });
  }),

  graphql.mutation<SetBioRiskEnabledMutation, SetBioRiskEnabledMutationVariables>(
    'SetBioRiskEnabled',
    ({ variables }) => {
      const bioRisk = bioRiskRepository.find('code', variables.code);
      if (bioRisk) {
        bioRisk.enabled = variables.enabled;
        bioRiskRepository.save(bioRisk);
        return HttpResponse.json({ data: { setBioRiskEnabled: bioRisk } }, { status: 200 });
      } else {
        return HttpResponse.json(
          { errors: [{ message: `Could not find the biological risk: "${variables.code}"` }] },
          { status: 404 }
        );
      }
    }
  ),

  graphql.query<GetBioRisksQuery, GetBioRisksQueryVariables>('GetBioRisks', ({ variables }) => {
    return HttpResponse.json(
      {
        data: {
          bioRisks: bioRiskRepository.findAll().filter((bioRisk) => variables.includeDisabled || isEnabled(bioRisk))
        }
      },
      { status: 200 }
    );
  }),

  graphql.query<GetLabwareBioRiskCodesQuery, GetLabwareBioRiskCodesQueryVariables>(
    'GetLabwareBioRiskCodes',
    ({ variables }) => {
      const labware: Labware = labwareFactory.build({ barcode: variables.barcode });
      return HttpResponse.json(
        {
          data: {
            labwareBioRiskCodes: labware.slots.map((slot) => {
              return {
                sampleId: slot.samples[0].id,
                bioRiskCode: bioRiskFactory.build().code
              };
            })
          }
        },
        { status: 200 }
      );
    }
  )
];

export default bioRiskHandler;
