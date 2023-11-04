describe("level", () => {
	it("field contains 100 cells, after selecting easy level", () => {
		cy.visit("/");
		cy.get('[type="radio"]').check("easy");
		cy.get('[data-testid="field"]').within(() => {
			cy.get("button").should("have.length", 100);
		});
	});

	it("field contains 225 cells, after selecting medium level", () => {
		cy.visit("/");
		cy.get('[type="radio"]').check("medium");
		cy.get('[data-testid="field"]').within(() => {
			cy.get("button").should("have.length", 225);
		});
	});

	it("field contains 625 cells, after selecting hard level", () => {
		cy.visit("/");
		cy.get('[type="radio"]').check("hard");
		cy.get('[data-testid="field"]').within(() => {
			cy.get("button").should("have.length", 625);
		});
	});
});
