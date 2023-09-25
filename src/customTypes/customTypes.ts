import { type LEVELS } from "@/utils/constants";

export type CSSCustomProperties = React.CSSProperties &
	Record<`--${string}`, number | string>;

export type Level = (typeof LEVELS)[number];

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type MinesAmount = IntRange<10, 100>;

export type GameStatus = "idle" | "play" | "win" | "lose";

export interface IgnoredCell {
	row: number;
	col: number;
}

export interface MainState {
	currentLevel: Level;
	minesAmount: MinesAmount;
}

export interface GameState {
	status: GameStatus;
	ignoredCell?: IgnoredCell | null;
}

export interface GlobalState {
	main: MainState;
	game: GameState;
}
