import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { type GameStatus } from "@/customTypes/customTypes";
import { type RootState } from "@/store/store";
import { SLICE_GAME } from "@/utils/constants";

const initialState: { status: GameStatus } = { status: "idle" };

const gameSlice = createSlice({
	name: SLICE_GAME,
	initialState,
	reducers: {
		updateGameStatus(state, action: PayloadAction<GameStatus>) {
			state.status = action.payload;
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
