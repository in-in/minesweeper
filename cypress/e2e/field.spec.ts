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

	it("highlight surrounding cells", () => {
		cy.get("@field").within(() => {
			cy.get("button").eq(0).trigger("mousedown", { button: 1 });
			cy.get("button:nth-child(2), button:nth-child(11), button:nth-child(12)").as(
				"btns",
			);
			cy.get("@btns").each(($el) => {
				cy.wrap($el)
					.invoke("attr", "class")
					.should("to.match", /highlight_/);
			});
			cy.get("button").eq(0).trigger("mouseup", { button: 1 });
			cy.get("@btns").each(($el) => {
				cy.wrap($el)
					.invoke("attr", "class")
					.should("not.to.match", /highlight_/);
			});
		});
	});
});
