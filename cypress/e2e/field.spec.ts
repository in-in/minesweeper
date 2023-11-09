describe("field", () => {
	it("field should contain 100 buttons", () => {
		cy.visit("/");
		cy.getByTestId("field").within(() => {
			cy.get("button").should("have.length", 100);
		});
	});
});
