import {
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TEXT,
	FINISH_WIN_MESSAGE_TITLE,
} from "@/utils/constants";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { getSuffix } from "@/utils/helpers/getSuffix";
import { replaceStubsInString } from "@/utils/helpers/replaceStubsInString";

describe("check finish status", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("win", () => {
		cy.getByTestId("mines-select").parent().select("99");
		cy.start();
		cy.getByTestId("dialog")
			.should("contain", FINISH_WIN_MESSAGE_TITLE)
			.should(
				"contain",
				replaceStubsInString({
					text: FINISH_WIN_MESSAGE_TEXT,
					slot1: formatClockTime(0),
					slot2: `${1} move${getSuffix(Number(1))}`,
				}),
			);
	});

	it("win message text", () => {
		cy.clock();
		cy.getByTestId("mines-select").parent().select("98");
		cy.start();
		cy.tick(2000);
		cy.getByTestId("field").within(() => {
			cy.get("button").not("[data-testid=9]").last().click();
		});
		cy.getByTestId("dialog").should(
			"contain",
			replaceStubsInString({
				text: FINISH_WIN_MESSAGE_TEXT,
				slot1: formatClockTime(2),
				slot2: `${2} move${getSuffix(Number(2))}`,
			}),
		);
	});

	it("lose", () => {
		cy.getByTestId("mines-select").parent().select("98");
		cy.start();
		cy.getByTestId(9).first().click();
		cy.getByTestId("dialog").should("contain", FINISH_LOSS_MESSAGE_TITLE);
	});
});
