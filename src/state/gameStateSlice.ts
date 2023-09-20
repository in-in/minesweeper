import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameStatus } from "@customTypes/customTypes";
import { type RootState } from "@state/store";
import * as constants from "@utils/constants";

const initialState: { status: GameStatus } = { status: "idle" };

const gameStateSlice = createSlice({
	name: constants.sliceGameState,
	initialState,
	reducers: {
		updateGameState(state, action: PayloadAction<GameStatus>) {
			state.status = action.payload;
		},
	},
});

const selectGameStateStatus = (state: RootState): GameStatus =>
	state[constants.sliceGameState].status;

export const selectIsPlayStatus = createSelector(
	selectGameStateStatus,
	(status) => status === "play",
);

export const { updateGameState } = gameStateSlice.actions;
export default gameStateSlice.reducer;
