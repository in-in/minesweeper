/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-namespace, @typescript-eslint/method-signature-style */

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(id: string | number): Chainable<JQuery>;
			findByTestId(id: string | number): Chainable<JQuery>;
			start(): void;
		}
	}
}

Cypress.Commands.add("getByTestId", (id: string | number) =>
	cy.get(`[data-testid=${id}]`),
);

Cypress.Commands.add(
	"findByTestId",
	{ prevSubject: true },
	(subject: Cypress.Chainable, id) => subject.find(`[data-testid=${id}]`),
);

Cypress.Commands.add("start", () =>
	cy.getByTestId("field").within(() => {
		cy.get("button").eq(0).click();
	}),
);
