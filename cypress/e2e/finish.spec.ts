import {
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TITLE,
} from "@/utils/constants";

describe("check finish status", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("win", () => {
		cy.getByTestId("mines-select").parent().select("99");
		cy.start();
		cy.getByTestId("dialog").should("contain", FINISH_WIN_MESSAGE_TITLE);
	});

	it("lose", () => {
		cy.getByTestId("mines-select").parent().select("98");
		cy.start();
		cy.getByTestId(9).first().click();
		cy.getByTestId("dialog").should("contain", FINISH_LOSS_MESSAGE_TITLE);
	});
});
