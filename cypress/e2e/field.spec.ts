import { LEVELS } from "@/utils/constants";

const [value] = Object.values(LEVELS[0]);
const initialLevel = value * value;

describe("field", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.start();
		cy.getByTestId("field").as("field");
	});

	it(`field should contain ${initialLevel} buttons`, () => {
		cy.get("@field").within(() => {
			cy.get("button").should("have.length", initialLevel);
		});
	});

	it("active class must be set to open cell", () => {
		cy.get("@field").within(() => {
			cy.get("button")
				.eq(0)
				.should(($btn) => expect($btn[0].className).to.match(/open_/));
		});
	});
});
