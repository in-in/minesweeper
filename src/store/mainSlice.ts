import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import {
	type Level,
	type MainState,
	type MinesAmount,
	type Status,
} from "@/customTypes/customTypes";

import { type RootState } from "@/store/store";
import { buildField } from "@/utils/buildField";
import { INITIAL_STATE, LEVELS, SLICE_MAIN } from "@/utils/constants";

const mainSlice = createSlice({
	name: SLICE_MAIN,
	initialState: INITIAL_STATE[SLICE_MAIN] as MainState,
	reducers: {
		switchLevel(state, action: PayloadAction<Level>) {
			state.currentLevel = action.payload;
			const payloadValues = Object.values(action.payload)[0] as number;
			state.field = buildField(payloadValues);
		},
		updateMinesAmount(state, action: PayloadAction<MinesAmount>) {
			state.minesAmount = action.payload;
		},
		start(state, action: PayloadAction<MainState["ignoredCell"]>) {
			state.status = "play";
			if (action.payload != null) {
				state.ignoredCell = action.payload;
			}
		},
		restart(state) {
			state.status = "idle";
			state.ignoredCell = null;
			state.field = buildField(Object.values(state.currentLevel)[0] as number);
		},
		updateField(state, action: PayloadAction<MainState["field"]>) {
			state.field = action.payload;
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

export const { switchLevel, updateMinesAmount, start, restart, updateField } =
	mainSlice.actions;
export default mainSlice.reducer;
