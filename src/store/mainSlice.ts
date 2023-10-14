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
			state.currentCell = null;
			state.openCellCount = 0;
			state.clockTime = 0;
			state.field = buildField({
				length: Object.values(state.currentLevel)[0] as number,
			});
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload;
		},
		changeCellState(state, action: PayloadAction<CellId>) {
			state.currentCell = action.payload;
			state.field = state.field.map((cell) =>
				cell.id === state.currentCell ? { ...cell, state: "opened" } : cell,
			);
			state.openCellCount = state.openCellCount += 1;
		},
		start(state) {
			state.status = "play";
		},
		play(state) {
			const currentCellMarker = state.field.find(
				(element) => element.id === state.currentCell,
			);

			if (currentCellMarker?.marker === 9) {
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
		clockTick: (state) => {
			state.clockTime += 1;
		},
		pageLoad(state) {
			state.isLoad = !state.isLoad;
		},
	},
});

export const {
	changeCellState,
	clockTick,
	displayHiddenMines,
	play,
	restart,
	start,
	switchLevel,
	pageLoad,
	updateField,
	updateMinesAmount,
} = mainSlice.actions;
export default mainSlice.reducer;
