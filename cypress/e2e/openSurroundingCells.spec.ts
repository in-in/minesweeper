import { type Cell, type GlobalState } from "@/customTypes/customTypes";

import { FINISH_WIN_MESSAGE_TEXT, SLICE_MAIN } from "@/utils/constants";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { getSuffix } from "@/utils/helpers/getSuffix";
import { replaceStubsInString } from "@/utils/helpers/replaceStubsInString";

describe("openSurroundingCells", () => {
	it("win message text", () => {
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
				cy.wrap(store).invoke("dispatch", {
					type: `${SLICE_MAIN}/openSurroundingCells`,
					payload: field,
				});
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
});
