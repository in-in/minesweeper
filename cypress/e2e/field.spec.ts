import { INITIAL_LEVEL } from "@/utils/constants";

const initialLevel = INITIAL_LEVEL.size * INITIAL_LEVEL.size;

describe("field", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.start();
		cy.getByTestId("field").as("field");
	});

	it(`field should contain ${initialLevel} buttons`, () => {
		cy.get("@field").within(() => {
			cy.get("[data-testid]").should("have.length", initialLevel);
		});
	});

	it("active class must be set to open cell", () => {
		cy.get("@field").within(() => {
			cy.get("[data-testid]").eq(0).should("have.data", "testopen");
		});
	});

	it("open cell cannot be closed back", () => {
		cy.getByTestId("0").first().as("cell");
		cy.get("@cell").then(($cell) => {
			cy.wrap($cell).click();
			cy.wrap($cell).should("have.data", "testopen");
			cy.wrap($cell).rightclick();
			cy.wrap($cell).should("be.empty");
			cy.wrap($cell).should("have.data", "testopen");
		});
	});
});
