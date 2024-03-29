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
				type: `${SLICE_MAIN}/openCell`,
				payload: field[0],
			});
		});
		cy.getByTestId("dialog").should(
			"contain",
			replaceStubsInString({
				text: FINISH_WIN_MESSAGE_TEXT,
				slot1: formatClockTime(0),
				slot2: `1 move${getSuffix(Number(1))}`,
			}),
		);
	});

	it("lose with incorrect flag", () => {
		cy.get("[data-testpos='8-1']").as("cell");
		cy.get("@cell").click();
		cy.get("[data-testpos='7-0']").rightclick();
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
		cy.get("[data-testpos='8-1']").as("cell");
		cy.get("@cell").click();
		cy.get("@cell").trigger("mousedown", { button: 1 });
		cy.get("[data-testhighlight]").should("have.length", 8);
		cy.get("@cell").trigger("mouseup", { button: 1 });
		cy.get("[data-testhighlight]").should("not.exist");
	});
});
