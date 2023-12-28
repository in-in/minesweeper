describe("scoretable", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("show and hide scoretable", () => {
		cy.getByTestId("scoretableButton").should("not.exist");
		cy.getByTestId("mines-select").parent().select("99");
		cy.start();
		cy.getByTestId("scoretableButton").should("exist");
		cy.getByTestId("dialog").within(() => {
			cy.contains("button", "restart", { matchCase: false }).click();
		});
		cy.getByTestId("scoretableButton").click();
		cy.clock();
		cy.tick(1000);
		cy.getByTestId("scoretableProgress").should("exist");
		cy.tick(2000);
		cy.getByTestId("scoretableGrid").should("contain", "1–1 of 1");
		cy.tick(3000);
		cy.getByTestId("scoretableDialog").within(() => {
			cy.contains("button", "close", { matchCase: false }).click();
		});
		cy.tick(4000);
		cy.getByTestId("scoretableDialog").should("not.exist");
	});
});
