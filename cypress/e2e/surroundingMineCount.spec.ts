const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

describe("surrounding mine count", () => {
	it("surrounding mine count", () => {
		cy.visit("/");
		cy.getByTestId("mines-select").parent().select("30");
		cy.start();

		NUMBERS.forEach((num) => {
			cy.getByTestId("field").then(($field) => {
				cy.wrap($field)
					.findByTestId(num)
					.then(($el) => {
						if ($el.length !== 0) {
							cy.getByTestId(num).first().click();
							num === 0
								? cy.getByTestId(num).first().should("be.empty")
								: cy.getByTestId(num).first().should("contain", num);
						} else {
							cy.log(`Cell with ${num} mines around doesn't exist`);
						}
					});
			});
		});
	});
});
