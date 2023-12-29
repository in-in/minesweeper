import type { fieldAdapter, scoretableAdapter } from "@/store/adapters";
import type { LEVELS, SLICE_MAIN } from "@/utils/constants";

export type CSSCustomProperties = React.CSSProperties &
	Record<`--${string}`, number | string>;

export interface Level {
	name: string;
	size: number;
}
export type Levels = (typeof LEVELS)[number];

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type MinesCounter = IntRange<10, 100>;

export type Status = "idle" | "play" | "win" | "lose";
export type StatusFinish = Extract<Status, "win" | "lose">;

export type CellId = `${number}-${number}`;
export type CellMarker = IntRange<0, 10>;
export type CellState = "closed" | "opened" | "flagged" | "highlighted";

export interface Cell {
	id: CellId;
	marker: CellMarker;
	state: CellState;
}

export interface ScoreRecord {
	clockTime: number;
	date: number;
	id: string;
	level: (typeof LEVELS)[number]["name"];
	turnCounter: number;
}

type Field = ReturnType<typeof fieldAdapter.getInitialState>;
type Scoretable = ReturnType<typeof scoretableAdapter.getInitialState>;

export interface MainState {
	clockTime: number;
	currentLevel: Levels;
	currentSelectCellId: CellId | null;
	field: Field;
	finishMessageText: string;
	finishMessageTitle: string;
	flagCounter: number;
	isLoad: boolean;
	isScoretableDisplay: boolean;
	isSoundEnabled: boolean;
	minesCounter: MinesCounter;
	openCellCounter: number;
	scoretable: Scoretable;
	status: Status;
	theme: "light" | "dark";
	turnCounter: number;
}

export interface GlobalState {
	[SLICE_MAIN]: MainState;
}
