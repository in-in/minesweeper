import { createSelector } from "@reduxjs/toolkit";

import {
	type Cell,
	type Level,
	type MinesCount,
	type Status,
} from "@/customTypes/customTypes";

import { type RootState } from "@/store/store";
import { LEVELS, SLICE_MAIN } from "@/utils/constants";

const selectCurrentLevel = (state: RootState): Level =>
	state[SLICE_MAIN].currentLevel;
const [initialLevelName] = Object.keys(LEVELS[0]);
const initialLevelValue = LEVELS[0][initialLevelName as keyof (typeof LEVELS)[0]];

export const selectMinesCount = (state: RootState): MinesCount =>
	state[SLICE_MAIN].minesCount;

export const selectField = (state: RootState): Cell[] => state[SLICE_MAIN].field;

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

export const selectOpenCellCount = createSelector(
	(state: RootState): number => state[SLICE_MAIN].openCellCount,
	(count) => count.toString(),
);

export const selectflagCount = createSelector(
	(state: RootState): number => state[SLICE_MAIN].flagCount,
	(count) => count.toString(),
);
