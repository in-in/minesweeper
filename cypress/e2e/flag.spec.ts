describe("flag", () => {
	it("add flag after right click", () => {
		cy.visit("/");
		cy.getByTestId("field").within(() => {
			cy.get("button").eq(0).rightclick();
			cy.get("button")
				.eq(0)
				.within(() => {
					cy.getByTestId("FlagIcon").should("be.visible");
				});
		});
	});
});
