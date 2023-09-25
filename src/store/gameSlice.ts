import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameStatus, type GameState } from "@/customTypes/customTypes";
import { type RootState } from "@/store/store";
import { SLICE_GAME, INITIAL_STATE } from "@/utils/constants";

const gameSlice = createSlice({
	name: SLICE_GAME,
	initialState: INITIAL_STATE[SLICE_GAME] as GameState,
	reducers: {
		updateGameStatus(state, action: PayloadAction<GameState>) {
			state = action.payload;
			return state;
		},
	},
});

const selectGameStatus = (state: RootState): GameStatus => state[SLICE_GAME].status;

export const selectIsPlayStatus = createSelector(
	selectGameStatus,
	(status) => status === "play",
);

export const { updateGameStatus } = gameSlice.actions;
export default gameSlice.reducer;
