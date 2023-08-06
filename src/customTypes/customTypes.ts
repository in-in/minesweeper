export type GlobalEvent =
	| { type: "TOGGLE" }
	| { type: "FINISH" }
	| { type: "TO_MEDIUM"; level: string }
	| { type: "TO_HARD"; level: string }
	| { type: "TO_EASY"; level: string }
	| { type: "UPDATE_MINES_AMOUNT"; value: minesAmount };

export type Level = { easy: 10 } | { medium: 15 } | { hard: 25 };

type Enumerate<
	N extends number,
	Acc extends number[] = [],
> = Acc["length"] extends N
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
