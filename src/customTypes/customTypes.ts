import type React from "react";

import { type fieldAdapter } from "@/store/fieldAdapter";
import { type LEVELS, type SLICE_MAIN } from "@/utils/constants";

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

export type MinesCounter = IntRange<10, 100>;

export type Status = "idle" | "play" | "win" | "lose";
export type StatusFinish = Extract<Status, "win" | "lose">;

export type CellId = `${number}-${number}`;
export type CellMarker = IntRange<0, 10>;
export type CellState = "closed" | "opened" | "flagged" | "highlighted";

export type Cell = {
	id: CellId;
	marker: CellMarker;
	state: CellState;
};

export type MainState = {
	clockTime: number;
	currentLevel: Level;
	currentSelectCellId: CellId | null;
	field: ReturnType<typeof fieldAdapter.getInitialState>;
	finishMessageText: string;
	finishMessageTitle: string;
	flagCounter: number;
	isLoad: boolean;
	minesCounter: MinesCounter;
	openCellCounter: number;
	status: Status;
	turnCounter: number;
};

export type GlobalState = {
	[SLICE_MAIN]: MainState;
};
