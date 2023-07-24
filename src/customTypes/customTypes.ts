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
