export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const SLICE_GAME = "game";
export const INITIAL_STATE = {
	[SLICE_MAIN]: {
		currentLevel: { easy: 10 },
		minesAmount: 10,
	},
	[SLICE_GAME]: {
		status: "idle",
	},
} as const;
