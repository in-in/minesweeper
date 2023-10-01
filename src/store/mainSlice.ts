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
		restart(state) {
			state.status = "idle";
			state.ignoredCell = null;
			state.field = buildField(Object.values(state.currentLevel)[0] as number);
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			state.field = action.payload;
		},
		changeStatus(state, action: PayloadAction<CellId>) {
			switch (state.status) {
				case "idle": {
					state.status = "play";
					if (action.payload != null) {
						state.ignoredCell = action.payload;
					}
					break;
				}
				case "play": {
					const currentCellFlag = state.field.find(
						(element) => element.id === action.payload,
					);
					if (currentCellFlag?.flag === 9) {
						state.status = "lose";
					}
					break;
				}
			}
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

export const { changeStatus, restart, switchLevel, updateField, updateMinesAmount } =
	mainSlice.actions;
export default mainSlice.reducer;
