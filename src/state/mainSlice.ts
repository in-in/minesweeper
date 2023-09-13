import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameState, type Level } from "@customTypes/customTypes";

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

export const { switchLevel } = counterSlice.actions;
export default counterSlice.reducer;
