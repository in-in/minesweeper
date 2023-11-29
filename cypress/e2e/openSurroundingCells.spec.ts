import { type Cell, type GlobalState } from "@/customTypes/customTypes";

import {
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TEXT,
	SLICE_MAIN,
} from "@/utils/constants";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { getSuffix } from "@/utils/helpers/getSuffix";
import { replaceStubsInString } from "@/utils/helpers/replaceStubsInString";

describe("openSurroundingCells", () => {
	beforeEach(() => {
		cy.fixture("initialState").then((state: GlobalState) => {
			cy.visit("/", {
				onBeforeLoad: (window) => {
					window.initialState = state;
				},
			});
		});

		cy.fixture("field").then((field: Cell[]) => {
			cy.getStore().then((store) => {
				cy.wrap(store).invoke("dispatch", { type: `${SLICE_MAIN}/start` });
				cy.wrap(store).invoke("dispatch", {
					type: `${SLICE_MAIN}/updateField`,
					payload: field,
				});
				cy.wrap(store).invoke("dispatch", { type: `${SLICE_MAIN}/play` });
			});
		});
	});

	it("win message text", () => {
		cy.fixture("field").then((field: Cell[]) => {
			cy.getStore().invoke("dispatch", {
				type: `${SLICE_MAIN}/openSurroundingCells`,
				payload: field,
			});
		});

		cy.getByTestId("dialog").should(
			"contain",
			replaceStubsInString({
				text: FINISH_WIN_MESSAGE_TEXT,
				slot1: formatClockTime(0),
				slot2: `${0} move${getSuffix(Number(0))}`,
			}),
		);
	});

	it("lose with incorrect flag", () => {
		cy.get("[data-testid='0']+[data-testid='1']:not(:nth-child(10n+1))")
			.last()
			.as("cell");
		cy.get("@cell").click();
		cy.get("@cell").prev().rightclick();
		cy.get("@cell").trigger("mousedown", { button: 1 });
		cy.getByTestId("dialog").should("contain", FINISH_LOSS_MESSAGE_TITLE);
	});

	it("turn counter increments when opening a new cell", () => {
		cy.getByTestId("stat-turns").should("contain", 0);
		cy.getByTestId("1").first().click();
		cy.getByTestId("stat-turns").should("contain", 1);
		cy.getByTestId("1").last().click();
		cy.getByTestId("stat-turns").should("contain", 2);
	});

	it("highlight surrounding cells", () => {
		cy.getByTestId("field").within(() => {
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
