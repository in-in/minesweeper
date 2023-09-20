import type * as constants from "@utils/constants";

export type Level = (typeof constants.LEVELS)[number];

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type MinesAmount = IntRange<10, 100>;

export interface GameState {
	currentLevel: Level;
	minesAmount: MinesAmount;
}

export type CSSCustomProperties = React.CSSProperties &
	Record<`--${string}`, number | string>;

export type GameStatus = "idle" | "play" | "win" | "lose";
