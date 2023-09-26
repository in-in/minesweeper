export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const INITIAL_STATE = {
	[SLICE_MAIN]: {
		currentLevel: { easy: 10 },
		minesAmount: 10,
		status: "idle",
		ignoredCell: null,
		field: Array.from({ length: 10 }, (_, row) =>
			Array.from({ length: 10 }, (_, col) => `${row}-${col}`),
		).flatMap((row) => row),
	},
};
