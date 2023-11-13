import { LEVELS } from "@/utils/constants";

const [value] = Object.values(LEVELS[0]);
const initialLevel = value * value;

describe("field", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it(`field should contain ${initialLevel} buttons`, () => {
		cy.getByTestId("field").within(() => {
			cy.get("button").should("have.length", initialLevel);
		});
	});

	it("active class must be set to open cell", () => {
		cy.start();
		cy.getByTestId("field").within(() => {
			cy.get("button")
				.eq(0)
				.should(($btn) => expect($btn[0].className).to.match(/open_/));
		});
	});
});
