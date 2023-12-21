describe("theme", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("button should switch between light and dark theme", () => {
		cy.getByTestId("theme-button").as("btn");
		cy.get("@btn").should("contain", "dark mode");
		cy.get("@btn").within(() => {
			cy.getByTestId("Brightness4Icon").should("not.exist");
			cy.getByTestId("Brightness7Icon").should("exist");
			cy.get("button").click();
			cy.getByTestId("Brightness7Icon").should("not.exist");
			cy.getByTestId("Brightness4Icon").should("exist");
		});
		cy.get("@btn").should("contain", "light mode");
	});
});
