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

export type Status = "idle" | "play" | "win" | "lose";

export type CellId = `${number}-${number}`;
export type CellFlag = IntRange<0, 10>;

export interface Cell {
	id: CellId;
	flag: CellFlag;
}

export interface MainState {
	currentLevel: Level;
	minesAmount: MinesAmount;
	status: Status;
	ignoredCell: CellId | null;
	field: Cell[];
}

export interface GlobalState {
	main: MainState;
}
