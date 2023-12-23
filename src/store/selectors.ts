import {
	type Cell,
	type Levels,
	type MainState,
	type MinesCounter,
	type Status,
} from "@/customTypes/customTypes";

import { createSelector } from "@reduxjs/toolkit";

import { fieldAdapterSelectors } from "@/store/adapters";
import { type RootState } from "@/store/store";
import { SLICE_MAIN } from "@/utils/constants";

const selectCurrentLevel = (state: RootState): Levels =>
	state[SLICE_MAIN].currentLevel;

export const selectMinesCounter = (state: RootState): MinesCounter =>
	state[SLICE_MAIN].minesCounter;

export const selectField = (state: RootState): Cell[] =>
	fieldAdapterSelectors.selectAll(state[SLICE_MAIN].field);

export const selectCurrentLevelName = createSelector(
	selectCurrentLevel,
	(level) => level.name,
);

export const selectCurrentLevelSize = createSelector(
	selectCurrentLevel,
	(level) => level.size,
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

export const selectTheme = (state: RootState): MainState["theme"] =>
	state[SLICE_MAIN].theme;
