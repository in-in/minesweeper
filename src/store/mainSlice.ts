import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import {
	type Cell,
	type CellId,
	type Level,
	type MainState,
	type MinesAmount,
	type Status,
} from "@/customTypes/customTypes";

import { type RootState } from "@/store/store";
import { buildField } from "@/utils/buildField";
import {
	FINISH_LOSS_MESSAGE_TEXT,
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TEXT,
	FINISH_WIN_MESSAGE_TITLE,
	INITIAL_STATE,
	LEVELS,
	SLICE_MAIN,
} from "@/utils/constants";

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

const selectCurrentLevel = (state: RootState): Level =>
	state[SLICE_MAIN].currentLevel;
const [initialLevelName] = Object.keys(LEVELS[0]);
const initialLevelValue = LEVELS[0][initialLevelName as keyof (typeof LEVELS)[0]];

export const selectminesAmount = (state: RootState): MinesAmount =>
	state[SLICE_MAIN].minesAmount;

export const selectField = (state: RootState): Cell[] => state[SLICE_MAIN].field;

export const selectCurrentLevelValue = createSelector(
	selectCurrentLevel,
	(level) => Object.values(level)[0] ?? initialLevelValue,
);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => Object.keys(level)[0] ?? initialLevelName,
);

const selectStatus = (state: RootState): Status => state[SLICE_MAIN].status;

export const selectIsIdleStatus = createSelector(
	selectStatus,
	(status) => status === "idle",
);

export const selectIsFinishStatus = createSelector(
	selectStatus,
	(status) => status === "lose" || status === "win",
);

export const selectFinishMessage = createSelector(
	(state: RootState): string => state[SLICE_MAIN].finishMessageTitle,
	(state: RootState): string => state[SLICE_MAIN].finishMessageText,
	(title, text) => ({ title, text }),
);

export const selectClockTime = (state: RootState): number =>
	state[SLICE_MAIN].clockTime;

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
