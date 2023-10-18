import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import {
	type Cell,
	type CellId,
	type Level,
	type MainState,
	type MinesAmount,
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
		updateMinesAmount(state, action: PayloadAction<MinesAmount>) {
			state.minesAmount = action.payload;
		},
		restart(state) {
			state.status = "idle";
			state.currentSelectCell = null;
			state.openCellCount = 0;
			state.clockTime = 0;
			state.flagCount = state.minesAmount;
			state.field = buildField({
				length: Object.values(state.currentLevel)[0] as number,
			});
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload;
		},
		openCell(state, action: PayloadAction<CellId>) {
			state.currentSelectCell = action.payload;
			state.field = state.field.map((cell) => {
				return cell.id === state.currentSelectCell && cell.state === "closed"
					? { ...cell, state: "opened" }
					: cell;
			});
			state.openCellCount = state.openCellCount += 1;
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
				(element) => element.id === state.currentSelectCell,
			);

			if (currentSelectCellMarker?.marker === 9) {
				state.status = "lose";
				state.finishMessageTitle = FINISH_LOSS_MESSAGE_TITLE;
				state.finishMessageText = FINISH_LOSS_MESSAGE_TEXT;
			} else if (state.openCellCount >= state.field.length - state.minesAmount) {
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
	pageLoad,
	play,
	restart,
	start,
	switchLevel,
	toggleCellFlag,
	updateField,
	updateMinesAmount,
	мarkМineWithFlag,
} = mainSlice.actions;
export default mainSlice.reducer;
