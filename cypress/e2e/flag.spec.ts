import { INITIAL_STATE, SLICE_MAIN } from "@/utils/constants";

const flags = INITIAL_STATE[SLICE_MAIN].minesCount;

describe("flag", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("add flag after right click", () => {
		cy.getByTestId("field").within(() => {
			cy.get("button").eq(0).rightclick();
			cy.get("button")
				.eq(0)
				.within(() => {
					cy.getByTestId("FlagIcon").should("be.visible");
				});
		});
	});

	it("number of mines and flags must be equal", () => {
		cy.getByTestId("mines-select").parent().select("42");
		cy.getByTestId("stat-flags").should("contain", "42");
	});

	it("counter changes when flags are set", () => {
		cy.getByTestId("stat-flags").should("contain", flags);
		cy.getByTestId("field").within(() => {
			cy.get("button").eq(0).rightclick();
		});
		cy.getByTestId("stat-flags").should("contain", flags - 1);
		cy.getByTestId("field").within(() => {
			cy.get("button").eq(0).rightclick();
		});
		cy.getByTestId("stat-flags").should("contain", flags);
	});
});
