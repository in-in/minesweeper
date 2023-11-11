import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";

describe("timer", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("timer has to run", () => {
		cy.clock();
		cy.start();
		cy.getByTestId("stat-timer").should("contain", formatClockTimeToHHMMSS(0));
		cy.tick(1000);
		cy.getByTestId("stat-timer").should("contain", formatClockTimeToHHMMSS(1));
		cy.tick(2000);
		cy.getByTestId("stat-timer").should("contain", formatClockTimeToHHMMSS(3));
	});
});
