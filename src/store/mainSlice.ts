import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import {
	type Cell,
	type CellId,
	type Level,
	type MainState,
	type MinesCount,
} from "@/customTypes/customTypes";

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
	initialState: INITIAL_STATE[SLICE_MAIN] as MainState,
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
			state.field = buildField({
				length: Object.values(action.payload)[0] as number,
			});
		},
		updateMinesCount(state, action: PayloadAction<MinesCount>) {
			state.minesCount = action.payload;
			state.flagCount = action.payload;
		},
		restart(state) {
			state.status = "idle";
			state.currentSelectCellId = null;
			state.openCellCount = 0;
			state.turnCounter = 0;
			state.clockTime = 0;
			state.flagCount = state.minesCount;
			state.field = buildField({
				length: Object.values(state.currentLevel)[0] as number,
			});
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload;
			state.flagCount = state.minesCount;
		},
		openCell(state, action: PayloadAction<Cell>) {
			state.currentSelectCellId = action.payload.id;
			state.field = state.field.map((cell) => {
				return cell.id === state.currentSelectCellId && cell.state === "closed"
					? { ...cell, state: "opened" }
					: cell;
			});
			state.turnCounter = state.turnCounter += 1;
			state.openCellCount = state.openCellCount += 1;
		},
		openSurroundingCells(state, action: PayloadAction<Cell[]>) {
			state.field = state.field.map((cell) => {
				return action.payload.find((el) => el.id === cell.id) != null
					? { ...cell, state: "opened" }
					: cell;
			});

			state.openCellCount = state.field.filter((el) => el.state === "opened").length;
		},
		revealSurroundingCells(
			state,
			action: PayloadAction<{
				id: CellId;
				highlight: boolean;
			}>,
		) {
			const targetCell = state.field.find((cell) => cell.id === action.payload.id);

			const surroundingCells = getSurroundingCells({
				id: action.payload.id,
				limit: Object.values(state.currentLevel)[0] as number,
				field: state.field,
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
					state.field = highlightSurroundingCells({
						field: state.field,
						highlight: action.payload.highlight,
						surroundingCells,
					});
				}
			});
		},
		toggleCellFlag(state, action: PayloadAction<CellId>) {
			state.field = state.field.map((cell) => {
				if (cell.id !== action.payload || cell.state === "opened") {
					return cell;
				}
				const newState = cell.state === "closed" ? "flagged" : "closed";
				state.flagCount += newState === "flagged" ? -1 : 1;
				return { ...cell, state: newState };
			});
		},
		start(state) {
			state.status = "play";
		},
		play(state) {
			const currentSelectCellMarker = state.field.find(
				(element) => element.id === state.currentSelectCellId,
			);

			if (currentSelectCellMarker?.marker === 9) {
				state.status = "lose";
				state.finishMessageTitle = FINISH_LOSS_MESSAGE_TITLE;
				state.finishMessageText = FINISH_LOSS_MESSAGE_TEXT;
			} else if (state.openCellCount >= state.field.length - state.minesCount) {
				state.status = "win";
				state.finishMessageTitle = FINISH_WIN_MESSAGE_TITLE;
				state.finishMessageText = FINISH_WIN_MESSAGE_TEXT;
			}
		},
		displayHiddenMines(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload.map((cell) =>
				cell.marker === 9 ? { ...cell, state: "opened" } : cell,
			);
		},
		мarkМineWithFlag(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload.map((cell) =>
				cell.marker === 9 ? { ...cell, state: "flagged" } : cell,
			);
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
	updateMinesCount,
	мarkМineWithFlag,
} = mainSlice.actions;
export default mainSlice.reducer;
