import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameState, type Level } from "@customTypes/customTypes";
import { type RootState } from "@state/store";

const initialState: GameState = {
	currentLevel: {
		easy: 10,
	},
	minesAmount: 10,
};

const counterSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
		},
	},
});

const selectCurrentLevel = (state: RootState): Level => state.main.currentLevel;

export const selectCurrentLevelValue = createSelector(
	selectCurrentLevel,
	(level) => Object.values(level)[0] ?? 10,
);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => Object.keys(level)[0] ?? "easy",
);

export const { switchLevel } = counterSlice.actions;
export default counterSlice.reducer;
