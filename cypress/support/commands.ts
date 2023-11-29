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

Cypress.Commands.add("getStore", () => cy.window().its("store"));
