import { buildField } from "./buildField";

export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const INITIAL_STATE = {
	[SLICE_MAIN]: {
		currentLevel: LEVELS[0],
		minesAmount: 10,
		status: "idle",
		ignoredCell: null,
		currentCell: null,
		field: buildField(10),
		finishMessageTitle: " ",
		finishMessageText: " ",
	},
};
