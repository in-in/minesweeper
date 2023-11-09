/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-namespace, @typescript-eslint/method-signature-style */

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(id: string | number): Chainable<JQuery>;
		}
	}
}

Cypress.Commands.add("getByTestId", (id: string | number) => {
	return cy.get(`[data-testid=${id}]`);
});
