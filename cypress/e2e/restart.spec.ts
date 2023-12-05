import { INITIAL_LEVEL } from "@/utils/constants";
import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";

describe("restart", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("button disable state should change depending on game state", () => {
		cy.getByTestId("restart").should("be.disabled");
		cy.start();
		cy.getByTestId("restart").should("not.be.disabled");
	});

	it("after a restart the game state is reset", () => {
		cy.start();
		cy.getByTestId("restart").click();
		cy.getByTestId("0")
			.should("have.length", INITIAL_LEVEL.size * INITIAL_LEVEL.size)
			.should("be.empty");
		cy.getByTestId("stat-timer").should("contain", formatClockTimeToHHMMSS(0));
		cy.getByTestId("stat-turns").should("contain", 0);
	});
});
