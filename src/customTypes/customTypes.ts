export type GlobalEvent =
	| { type: "TOGGLE" }
	| { type: "FINISH" }
	| { type: "TO_MEDIUM" }
	| { type: "TO_HARD" }
	| { type: "TO_EASY" };

export type Level = { easy: 10 } | { medium: 15 } | { hard: 25 };

export const StateMain = {
	Idle: "idle",
	Play: "play",
	Finish: "finish",
} as const;

export const StateLevel = {
	Easy: "easy",
	Medium: "medium",
	Hard: "hard",
} as const;

export const StateFinish = {
	Win: "win",
	Lose: "lose",
} as const;
