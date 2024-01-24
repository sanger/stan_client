import { RecordOrientationQcMutation, RecordOrientationQcMutationVariables } from '../../../src/types/sdk';
import { selectOption, selectSGPNumber } from '../shared/customReactSelect.cy';

describe('Release Page', () => {
  before(() => {
    cy.visit('lab/sectioning/orientation_qc');
  });
  context('when submitted succesfully', () => {
    it('should display Submit success message', () => {
      cy.get('#labwareScanInput').type('STAN-1112{enter}');
      selectSGPNumber('SGP1008');
      selectOption('orientation', 'Correct');
      cy.findByRole('button', { name: /Submit/i }).click();
      cy.findByText('Orientation QC submitted successfully.').should('be.visible');
    });
  });
  context('when submitted with error', () => {
    before(() => {
      cy.visit('lab/sectioning/orientation_qc');
      cy.msw().then(({ worker, graphql }) => {
        worker.use(
          graphql.mutation<RecordOrientationQcMutation, RecordOrientationQcMutationVariables>(
            'RecordOrientationQC',
            (req, res, ctx) => {
              return res.once(
                ctx.errors([
                  {
                    message: 'Exception while submitting : Something went wrong'
                  }
                ])
              );
            }
          )
        );
      });
    });
    it('shows an error', () => {
      cy.get('#labwareScanInput').type('STAN-1111{enter}');
      selectSGPNumber('SGP1008');
      selectOption('orientation', 'Correct');
      cy.findByRole('button', { name: /Submit/i }).click();
      cy.findByText('Something went wrong').should('be.visible');
    });
  });
});
