import {
  GetLabwareInLocationQuery,
  GetLabwareInLocationQueryVariables,
  ReleaseLabwareMutation,
  ReleaseLabwareMutationVariables
} from '../../../src/types/sdk';
import { buildLabwareFragment } from '../../../src/lib/helpers/labwareHelper';
import { labwareTypeInstances } from '../../../src/lib/factories/labwareTypeFactory';
import labwareFactory from '../../../src/lib/factories/labwareFactory';
import { selectOption, shouldDisplaySelectedValue } from '../shared/customReactSelect.cy';

describe('Release Page', () => {
  before(() => {
    cy.visit('/admin/release');
  });

  context('when form is submitted without filling in any fields', () => {
    before(() => {
      cy.findByRole('button', { name: /Release Labware/i })
        .should('be.visible')
        .click({ force: true });
    });

    it('shows an error about labwares', () => {
      cy.findByText('Please scan in at least 1 labware').should('be.visible');
    });

    it('shows an error about Group/Team', () => {
      cy.findByText('Group/Team is a required field').should('be.visible');
    });

    it('shows an error about Contact', () => {
      cy.findByText('Contact is a required field').should('be.visible');
    });
  });
  context('when labware/location release type is selected', () => {
    before(() => {
      cy.get('[type="radio"]').first().check();
    });
    context('when labware is scanned for release', () => {
      before(() => {
        cy.get('#labwareScanInput').type('STAN-123{enter}');
        cy.get('#labwareScanInput').type('STAN-456{enter}');
      });
      it('shows labware to release', () => {
        cy.findByText('Labware to release').should('be.visible');
        cy.findByRole('table').should('be.visible').contains('td', 'STAN-123');
        cy.findByRole('table').contains('td', 'STAN-456');
      });
      it('should display a default workNumber on scan if there is worknumber assigned to labware', () => {
        shouldDisplaySelectedValue('workNumber', 'SGP1008', 0);
        shouldDisplaySelectedValue('workNumber', 'SGP1008', 1);
      });
      it('shows scanned labware info in summary', () => {
        cy.contains('2 piece(s) of labware will be released.');
        cy.contains('Please select a group/team').should('be.visible');
        cy.contains('Please select a contact').should('be.visible');
      });
      it('displays a Select all dropdown for SGP numbers', () => {
        cy.findByTestId('select-all').should('be.visible');
      });
      it('should display a table with labware info', () => {
        cy.findByRole('table').should('be.visible');
        cy.findByRole('table').within((elem) => {
          cy.wrap(elem).contains('td', 'STAN-123');
          cy.wrap(elem).contains('td', 'STAN-456');
          cy.wrap(elem).findAllByTestId('workNumber').should('have.length', 2);
        });
      });
    });

    context('Selecting SGP numbers for all scanned labware', () => {
      before(() => {
        selectOption('select-all', 'SGP1008');
      });
      it('should select the selected worknumber for all scanned labware in table', () => {
        shouldDisplaySelectedValue('workNumber', 'SGP1008', 0);
        shouldDisplaySelectedValue('workNumber', 'SGP1008', 1);
      });
    });

    context('when group/team is selected', () => {
      before(() => {
        selectOption('group', 'Vento lab');
      });
      it('shows updated information in summary', () => {
        cy.contains('2 piece(s) of labware will be released to Vento lab.').should('be.visible');
        cy.contains('Please select a contact').should('be.visible');
      });
    });
    context('when destination is selected', () => {
      before(() => {
        selectOption('contact', 'cs41');
      });
      it('shows updated information in summary', () => {
        cy.contains('The primary contact is cs41').should('be.visible');
      });
    });

    context('when all is valid', () => {
      before(() => {
        fillInForm();
      });

      it('shows a success message', () => {
        cy.findByText('Labware(s) Released').should('be.visible');
      });

      it('shows the download button', () => {
        cy.findByText('Download Release File').should('be.visible');
        // cy.get("a[href='/release?id=1001,1002']").should("be.visible");
      });
    });

    context('when form is submitted with a labware that has already been released', () => {
      before(() => {
        cy.visit('/admin/release');
        cy.msw().then(({ worker, graphql }) => {
          worker.use(
            graphql.mutation<ReleaseLabwareMutation, ReleaseLabwareMutationVariables>(
              'ReleaseLabware',
              (req, res, ctx) => {
                const { releaseLabware } = req.variables.releaseRequest;
                return res.once(
                  ctx.errors([
                    {
                      message: `Exception while fetching data (/release) : Labware has already been released: [${releaseLabware
                        .map((rlw) => rlw.barcode)
                        .join(',')}]`
                    }
                  ])
                );
              }
            )
          );
        });

        fillInForm();
      });

      it('shows an error', () => {
        cy.findByText('Labware has already been released: [STAN-123,STAN-456]').should('be.visible');
      });

      it("doesn't show the download button", () => {
        cy.findByText('Download Release File').should('not.exist');
      });
    });

    context('when location barcode is scanned with a labware which is already released', () => {
      before(() => {
        cy.msw().then(({ worker, graphql }) => {
          worker.use(
            graphql.query<GetLabwareInLocationQuery, GetLabwareInLocationQueryVariables>(
              'GetLabwareInLocation',
              (req, res, ctx) => {
                // The number after STAN- determines what kind of labware will be returned
                const labwaresBarcodes: string[] = ['STAN-3111', 'STAN-3112', 'STAN-3113'];
                const labwares = labwaresBarcodes.map((barcode) => {
                  const magicNumber = parseInt(barcode.substr(5, 1));
                  const labwareType = labwareTypeInstances[magicNumber % labwareTypeInstances.length];
                  // The number after that determines how many samples to put in each slot
                  const samplesPerSlot = parseInt(barcode.substr(6, 1));

                  const labware = labwareFactory.build(
                    {
                      barcode: barcode
                    },
                    {
                      transient: {
                        samplesPerSlot
                      },
                      associations: {
                        labwareType
                      }
                    }
                  );
                  return buildLabwareFragment(labware);
                });
                labwares[0].released = true;
                return res(
                  ctx.data({
                    labwareInLocation: labwares
                  })
                );
              }
            )
          );
        });
        cy.get('#locationScanInput').clear().type('STO-111{enter}');
      });
      it('should display a table with STAN-3112', () => {
        cy.findByRole('table').should('contain.text', 'STAN-3112');
      });
      it('should display warning message that STAN-3111 is released', () => {
        cy.findByText('Labware STAN-3111 has already been released.').should('exist');
      });
    });
    context('when location barcode is scanned', () => {
      before(() => {
        cy.get('#locationScanInput').clear().type('STO-11{enter}');
      });
      it('should display a table', () => {
        cy.findByRole('table').should('exist');
      });
    });
  });
  context('when work number release type is selected', () => {
    before(() => {
      cy.get('[type="radio"]').check('SGP Number');
    });
    it('should display SGP selection dropdown', () => {
      cy.findByTestId('worknumber_release').should('exist');
    });

    context('when an SGP number is selected for release', () => {
      before(() => {
        selectOption('worknumber_release', 'SGP1008');
      });
      it('should display release labware table', () => {
        cy.findByText('Labware to release').should('be.visible');
        cy.findByRole('table').should('exist');
      });
    });
    context('when all fields are not filled', () => {});
    context('when all required fields are given', () => {
      before(() => {
        selectOption('group', 'Vento lab');
        selectOption('contact', 'cs41');
        cy.findByRole('button', { name: /Release Labware/i }).click({ force: true });
      });

      it('shows a success message', () => {
        cy.findByText('Labware(s) Released').should('be.visible');
      });

      it('shows the download button', () => {
        cy.findByText('Download Release File').should('be.visible');
      });
    });
  });
});
function fillInForm() {
  cy.get('#labwareScanInput').type('STAN-123{enter}');
  cy.get('#labwareScanInput').type('STAN-456{enter}');
  selectOption('group', 'Vento lab');
  selectOption('contact', 'cs41');
  cy.findByRole('button', { name: /Release Labware/i }).click({ force: true });
}
