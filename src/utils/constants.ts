export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const sliceMain = "main";
export const sliceGame = "game";
export const initialState = {
	main: {
		currentLevel: { easy: 10 },
		minesAmount: 10,
	},
	game: { status: "idle" },
};
