const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

describe("surrounding mine count", () => {
	it("surrounding mine count", () => {
		cy.visit("/");
		cy.getByTestId("field").within(() => {
			cy.get("button").eq(0).click();
		});

		NUMBERS.forEach((num) => {
			cy.getByTestId("field").then(($field) => {
				if (num === 0) {
					cy.getByTestId(num).first().click();
					cy.getByTestId(num).first().should("be.empty");
				} else if ($field.find(`[data-testid=${num}]`).length !== 0) {
					cy.getByTestId(num).first().click();
					cy.getByTestId(num).first().should("contain", num);
				} else {
					cy.log(`Cell with ${num} mines around doesn't exist`);
				}
			});
		});
	});
});
