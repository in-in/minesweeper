import type { GlobalState } from "@/customTypes/customTypes";

describe("scoretable", () => {
	it("show and hide scoretable", () => {
		cy.visit("/");
		cy.getByTestId("scoretableButton").should("not.exist");
		cy.getByTestId("mines-select").parent().select("99");
		cy.start();
		cy.getByTestId("scoretableButton").should("exist");
		cy.getByTestId("dialog").within(() => {
			cy.contains("button", "restart", { matchCase: false }).click();
		});
		cy.getByTestId("scoretableButton").click();
		cy.clock();
		cy.tick(1000);
		cy.getByTestId("scoretableProgress").should("exist");
		cy.tick(2000);
		cy.getByTestId("scoretableGrid").should("contain", "1–1 of 1");
		cy.tick(3000);
		cy.getByTestId("scoretableDialog").within(() => {
			cy.contains("button", "close", { matchCase: false }).click();
		});
		cy.tick(4000);
		cy.getByTestId("scoretableDialog").should("not.exist");
	});

	function clickNext(page = 1): void {
		cy.get("button[title='Go to next page']", { log: false }).as("btn");
		cy.get("@btn", { log: false })
			.invoke({ log: false }, "attr", "disabled")
			.then((disabled) => {
				if (disabled === "disabled") {
					cy.log("Last page");
				} else {
					cy.log(`Page ${page}`);
					cy.get("@btn", { log: false }).click({ log: false });
					cy.get("@btn", { log: false }).then(() => {
						clickNext(page++);
					});
				}
			});
	}

	it("clicks Next button until the last page", () => {
		cy.fixture("initialStateScoretable").then((state: GlobalState) => {
			cy.visit("/", {
				onBeforeLoad: (window) => {
					window.initialState = state;
				},
			});
		});

		cy.getByTestId("scoretableButton").click();
		cy.getByTestId("scoretableDialog").within(() => {
			clickNext();
		});
	});
});
