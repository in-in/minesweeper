const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

describe("surrounding mine count", () => {
	it("surrounding mine count", () => {
		cy.visit("/");
		cy.get('[data-testid="field"]').within(() => {
			cy.get("button").eq(0).click();
		});

		NUMBERS.forEach((num) => {
			cy.get('[data-testid="field"]').then(($field) => {
				const selector = `[data-testid=${num}]`;
				if (num === 0) {
					cy.get(selector).first().click();
					cy.get(selector).first().should("be.empty");
				} else if ($field.find(selector).length !== 0) {
					cy.get(selector).first().click();
					cy.get(selector).first().should("contain", num);
				} else {
					cy.log(`Cell with ${num} mines around doesn't exist`);
				}
			});
		});
	});
});
