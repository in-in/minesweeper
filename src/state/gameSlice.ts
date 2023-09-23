import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameStatus } from "@customTypes/customTypes";
import { type RootState } from "@state/store";
import * as constants from "@utils/constants";

const initialState: { status: GameStatus } = { status: "idle" };

const gameSlice = createSlice({
	name: constants.sliceGame,
	initialState,
	reducers: {
		updateGameStatus(state, action: PayloadAction<GameStatus>) {
			state.status = action.payload;
		},
	},
});

const selectGameStatus = (state: RootState): GameStatus =>
	state[constants.sliceGame].status;

export const selectIsPlayStatus = createSelector(
	selectGameStatus,
	(status) => status === "play",
);

export const { updateGameStatus } = gameSlice.actions;
export default gameSlice.reducer;
