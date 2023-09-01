export type Level = { easy: 10 } | { medium: 15 } | { hard: 25 };

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type minesAmount = IntRange<10, 100>;

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

export interface mainContext {
	currentLevel: Level;
	minesAmount: minesAmount;
}
