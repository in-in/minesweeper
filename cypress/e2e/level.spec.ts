import { LEVELS } from "@/utils/constants";

describe("level", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	LEVELS.map((level) => {
		const { name, size } = level;
		const cellsSize = size * size;
		return it(`field contains ${cellsSize} cells, after selecting ${name} level`, () => {
			cy.get('[type="radio"]').check(name);
			cy.getByTestId("field").within(() => {
				cy.get("[data-testid]").should("have.length", cellsSize);
			});
		});
	});
});
