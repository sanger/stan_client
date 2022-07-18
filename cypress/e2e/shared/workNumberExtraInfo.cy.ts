import {
  FindWorkInfoQuery,
  FindWorkInfoQueryVariables,
} from "../../../src/types/sdk";

export function shouldDisplyProjectAndUserNameForWorkNumber(url: string) {
  describe("Check work number selection displays work requester and project names", () => {
    before(() => {
      cy.visit(url);
      cy.msw().then(({ worker, graphql }) => {
        worker.use(
          graphql.query<FindWorkInfoQuery, FindWorkInfoQueryVariables>(
            "FindWorkInfo",
            (req, res, ctx) => {
              return res.once(
                ctx.data({
                  __typename: "Query",
                  works: [
                    {
                      __typename: "Work",
                      workNumber: "SGP1008",
                      project: {
                        __typename: "Project",
                        name: "Test project",
                      },
                      workRequester: {
                        __typename: "ReleaseRecipient",
                        username: "Test user",
                      },
                    },
                  ],
                })
              );
            }
          )
        );
        cy.findByTestId("workNumber").select("SGP1008");
      });
    });
    it("displays Work requester and Project name  ", () => {
      cy.findByText("Test project").should("be.visible");
      cy.findByText("Test user").should("be.visible");
    });
    after(() => {
      cy.url().reload();
    });
  });
}
