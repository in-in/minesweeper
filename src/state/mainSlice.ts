import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
	type GameState,
	type Level,
	type MinesAmount,
} from "@customTypes/customTypes";
import { type RootState } from "@state/store";
import * as constants from "@utils/constants";
import { localStorageWrapper } from "@utils/localStorageWrapper";

const sliceName = "main";
const initialState: GameState = {
	currentLevel: {
		easy: 10,
	},
	minesAmount: 10,
};

const localState: GameState =
	localStorageWrapper()?.getItem()?.[sliceName] ?? initialState;

const counterSlice = createSlice({
	name: sliceName,
	initialState: localState,
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
		},
		updateMinesAmount(state, action: PayloadAction<MinesAmount>) {
			state.minesAmount = action.payload;
		},
	},
});

const selectCurrentLevel = (state: RootState): Level => state.main.currentLevel;
const [initialLevelName] = Object.keys(constants.LEVELS[0]);
const initialLevelValue =
	constants.LEVELS[0][initialLevelName as keyof (typeof constants.LEVELS)[0]];

export const selectCurrentLevelValue = createSelector(
	selectCurrentLevel,
	(level) => Object.values(level)[0] ?? initialLevelValue,
);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => Object.keys(level)[0] ?? initialLevelName,
);

export const selectminesAmount = (state: RootState): MinesAmount =>
	state.main.minesAmount;

export const { switchLevel, updateMinesAmount } = counterSlice.actions;
export default counterSlice.reducer;
