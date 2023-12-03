import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import {
	type Cell,
	type CellId,
	type CellState,
	type Level,
	type MinesCounter,
	type StatusFinish,
} from "@/customTypes/customTypes";

import { fieldAdapter, fieldAdapterSelectors } from "@/store/fieldAdapter";
import {
	FINISH_LOSS_MESSAGE_TEXT,
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TEXT,
	FINISH_WIN_MESSAGE_TITLE,
	INITIAL_STATE,
	SLICE_MAIN,
} from "@/utils/constants";
import { buildField } from "@/utils/helpers/buildField";
import { getSurroundingCells } from "@/utils/helpers/getSurroundingCells";
import { highlightSurroundingCells } from "@/utils/helpers/highlightSurroundingCells";

const mainSlice = createSlice({
	name: SLICE_MAIN,
	initialState: INITIAL_STATE[SLICE_MAIN],
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
			fieldAdapter.setAll(
				state.field,
				buildField({
					length: Object.values(action.payload)[0] as number,
				}),
			);
		},
		updateMinesCounter(state, action: PayloadAction<MinesCounter>) {
			state.minesCounter = action.payload;
			state.flagCounter = action.payload;
		},
		restart(state) {
			state.status = "idle";
			state.currentSelectCellId = null;
			state.openCellCounter = 0;
			state.turnCounter = 0;
			state.clockTime = 0;
			state.flagCounter = state.minesCounter;
			fieldAdapter.setAll(
				state.field,
				buildField({
					length: Object.values(state.currentLevel)[0] as number,
				}),
			);
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			fieldAdapter.setAll(state.field, action.payload);
			state.flagCounter = state.minesCounter;
		},
		openCell(state, action: PayloadAction<Cell>) {
			state.currentSelectCellId = action.payload.id;
			fieldAdapter.updateOne(state.field, {
				id: action.payload.id,
				changes: { state: "opened" },
			});
			state.turnCounter = state.turnCounter += 1;
			state.openCellCounter = state.openCellCounter += 1;
		},
		openSurroundingCells(state, action: PayloadAction<Cell[]>) {
			const updateObjects = action.payload.map((el) => ({
				id: el.id,
				changes: { state: "opened" as CellState },
			}));

			fieldAdapter.updateMany(state.field, updateObjects);

			state.openCellCounter = fieldAdapterSelectors
				.selectAll(state.field)
				.filter((el) => el.state === "opened").length;
		},
		revealSurroundingCells(
			state,
			action: PayloadAction<{
				id: CellId;
				highlight: boolean;
			}>,
		) {
			const targetCell = state.field.entities[action.payload.id];

			const surroundingCells = getSurroundingCells({
				id: action.payload.id,
				limit: Object.values(state.currentLevel)[0] as number,
				field: fieldAdapterSelectors.selectAll(state.field),
			});

			const surroundingFlags = surroundingCells.reduce(
				(sum, curr) => (curr.state === "flagged" ? (sum += 1) : sum),
				0,
			);

			surroundingCells.forEach((cell) => {
				if (
					targetCell?.state === "opened" &&
					targetCell.marker !== 0 &&
					surroundingFlags === targetCell.marker &&
					cell.marker === 9 &&
					cell.state !== "flagged"
				) {
					state.currentSelectCellId = cell.id;
					mainSlice.caseReducers.play(state);
				} else {
					fieldAdapter.setMany(
						state.field,
						highlightSurroundingCells({
							highlight: action.payload.highlight,
							surroundingCells,
						}),
					);
				}
			});
		},

		toggleCellFlag(state, action: PayloadAction<CellId>) {
			const targetCellState = state.field.entities[action.payload]?.state;
			if (targetCellState === "closed" || targetCellState === "flagged") {
				const newState = targetCellState === "closed" ? "flagged" : "closed";
				fieldAdapter.updateOne(state.field, {
					id: action.payload,
					changes: { state: newState },
				});
				state.flagCounter += newState === "flagged" ? -1 : 1;
			}
		},
		start(state) {
			state.status = "play";
		},
		play(state) {
			if (state.currentSelectCellId != null) {
				const currentSelectCellMarker =
					state.field.entities[state.currentSelectCellId];

				if (currentSelectCellMarker?.marker === 9) {
					state.status = "lose";
					state.finishMessageTitle = FINISH_LOSS_MESSAGE_TITLE;
					state.finishMessageText = FINISH_LOSS_MESSAGE_TEXT;
				} else if (
					state.openCellCounter >=
					state.field.ids.length - state.minesCounter
				) {
					state.status = "win";
					state.finishMessageTitle = FINISH_WIN_MESSAGE_TITLE;
					state.finishMessageText = FINISH_WIN_MESSAGE_TEXT;
				}
			}
		},
		displayHiddenMines(state, action: PayloadAction<StatusFinish>) {
			const stateStatus: CellState = action.payload === "win" ? "flagged" : "opened";
			const updateObjects = fieldAdapterSelectors
				.selectAll(state.field)
				.filter((cell) => cell.marker === 9)
				.map((el) => ({
					id: el.id,
					changes: { state: stateStatus },
				}));

			fieldAdapter.updateMany(state.field, updateObjects);
		},
		clockTick: (state) => {
			state.clockTime += 1;
		},
		pageLoad(state) {
			state.isLoad = !state.isLoad;
		},
	},
});

export const {
	clockTick,
	displayHiddenMines,
	openCell,
	openSurroundingCells,
	pageLoad,
	play,
	restart,
	revealSurroundingCells,
	start,
	switchLevel,
	toggleCellFlag,
	updateField,
	updateMinesCounter,
} = mainSlice.actions;

export default mainSlice.reducer;
