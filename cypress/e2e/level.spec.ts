import { LEVELS } from "@/utils/constants";

describe("level", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	LEVELS.map((i) => {
		const [[key, val]] = Object.entries(i);
		const size = val * val;
		return it(`field contains ${size} cells, after selecting ${key} level`, () => {
			cy.get('[type="radio"]').check(key);
			cy.getByTestId("field").within(() => {
				cy.get("button").should("have.length", size);
			});
		});
	});
});
