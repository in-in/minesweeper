export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const SLICE_GAME = "game";
export const INITIAL_STATE = {
	main: {
		currentLevel: { easy: 10 },
		minesAmount: 10,
	},
	game: { status: "idle" },
};
