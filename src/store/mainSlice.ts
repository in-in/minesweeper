import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
	type Level,
	type MainState,
	type MinesAmount,
	type Status,
} from "@/customTypes/customTypes";
import { type RootState } from "@/store/store";
import { SLICE_MAIN, INITIAL_STATE, LEVELS } from "@/utils/constants";

const mainSlice = createSlice({
	name: SLICE_MAIN,
	initialState: INITIAL_STATE[SLICE_MAIN] as MainState,
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
		},
		updateMinesAmount(state, action: PayloadAction<MinesAmount>) {
			state.minesAmount = action.payload;
		},
		updateStatus(
			state,
			action: PayloadAction<Pick<MainState, "status" | "ignoredCell">>,
		) {
			state.status = action.payload.status;
			if (action.payload.ignoredCell != null) {
				state.ignoredCell = action.payload.ignoredCell;
			}
			return state;
		},
	},
});

const selectCurrentLevel = (state: RootState): Level =>
	state[SLICE_MAIN].currentLevel;
const [initialLevelName] = Object.keys(LEVELS[0]);
const initialLevelValue = LEVELS[0][initialLevelName as keyof (typeof LEVELS)[0]];

export const selectminesAmount = (state: RootState): MinesAmount =>
	state[SLICE_MAIN].minesAmount;

export const selectField = (state: RootState): MainState["field"] =>
	state[SLICE_MAIN].field;

export const selectCurrentLevelValue = createSelector(
	selectCurrentLevel,
	(level) => Object.values(level)[0] ?? initialLevelValue,
);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => Object.keys(level)[0] ?? initialLevelName,
);

export const selectIsPlayStatus = createSelector(
	(state: RootState): Status => state[SLICE_MAIN].status,
	(status) => status === "play",
);

export const { switchLevel, updateMinesAmount, updateStatus } = mainSlice.actions;
export default mainSlice.reducer;
