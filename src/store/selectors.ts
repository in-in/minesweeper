import { createSelector } from "@reduxjs/toolkit";

import {
	type Cell,
	type Level,
	type MinesCounter,
	type Status,
} from "@/customTypes/customTypes";

import { fieldAdapterSelectors } from "@/store/fieldAdapter";
import { type RootState } from "@/store/store";
import { LEVELS, SLICE_MAIN } from "@/utils/constants";

const selectCurrentLevel = (state: RootState): Level =>
	state[SLICE_MAIN].currentLevel;
const [initialLevelName] = Object.keys(LEVELS[0]);
const initialLevelValue = LEVELS[0][initialLevelName as keyof (typeof LEVELS)[0]];

export const selectMinesCounter = (state: RootState): MinesCounter =>
	state[SLICE_MAIN].minesCounter;

export const selectField = (state: RootState): Cell[] =>
	fieldAdapterSelectors.selectAll(state[SLICE_MAIN].field);

export const selectCurrentLevelValue = createSelector(
	selectCurrentLevel,
	(level) => Object.values(level)[0] ?? initialLevelValue,
);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => Object.keys(level)[0] ?? initialLevelName,
);

export const selectStatus = (state: RootState): Status => state[SLICE_MAIN].status;

export const selectIsIdleStatus = createSelector(
	selectStatus,
	(status) => status === "idle",
);

export const selectIsFinishStatus = createSelector(
	selectStatus,
	(status) => status === "lose" || status === "win",
);

export const selectFinishMessage = createSelector(
	(state: RootState): string => state[SLICE_MAIN].finishMessageTitle,
	(state: RootState): string => state[SLICE_MAIN].finishMessageText,
	(title, text) => ({ title, text }),
);

export const selectClockTime = (state: RootState): number =>
	state[SLICE_MAIN].clockTime;

export const selectTurnCounter = createSelector(
	(state: RootState): number => state[SLICE_MAIN].turnCounter,
	(count) => count.toString(),
);

export const selectflagCounter = createSelector(
	(state: RootState): number => state[SLICE_MAIN].flagCounter,
	(count) => count.toString(),
);
