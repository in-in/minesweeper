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

	it("turn counter increments when opening a new cell", () => {
		cy.getByTestId("stat-turns").should("contain", 0);
		cy.start();
		cy.getByTestId("stat-turns").should("contain", 1);
		cy.getByTestId("0").eq(2).click();
		cy.getByTestId("stat-turns").should("contain", 2);
	});
});
