describe("flag", () => {
	it("add flag after right click", () => {
		cy.visit("/");
		cy.get('[data-testid="field"]').within(() => {
			cy.get("button").eq(0).rightclick();
			cy.get("button")
				.eq(0)
				.within(() => {
					cy.get('[data-testid="FlagIcon"]').should("be.visible");
				});
		});
	});
});
