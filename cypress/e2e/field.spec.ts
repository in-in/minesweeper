import { LEVELS } from "@/utils/constants";

const [value] = Object.values(LEVELS[0]);
const initialLevel = value * value;

describe("field", () => {
	it(`field should contain ${initialLevel} buttons`, () => {
		cy.visit("/");
		cy.getByTestId("field").within(() => {
			cy.get("button").should("have.length", initialLevel);
		});
	});
});
