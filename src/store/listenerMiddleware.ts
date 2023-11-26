import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";

import { addListener, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { type Cell, type CellId } from "@/customTypes/customTypes";

import {
	clockTick,
	displayHiddenMines,
	openCell,
	openSurroundingCells,
	pageLoad,
	play,
	start,
	updateField,
	мarkМineWithFlag,
} from "@/store/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { SLICE_MAIN } from "@/utils/constants";
import { getSurroundingCells } from "@/utils/helpers/getSurroundingCells";
import { localStorageWrapper } from "@/utils/helpers/localStorageWrapper";
import { placeMines } from "@/utils/helpers/placeMines";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
	listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
	RootState,
	AppDispatch
>;

let intervalId: ReturnType<typeof setInterval>;

startAppListening({
	predicate: () => true,
	effect: (_, { getState }) => {
		const state = JSON.stringify(getState());
		localStorageWrapper()?.setItem(state);
	},
});

startAppListening({
	predicate: (action, currentState) =>
		openCell.match(action) && currentState[SLICE_MAIN].status === "idle",
	effect: (_action, { dispatch, getState }) => {
		dispatch(start());
		const state = getState();
		const mines = placeMines(state[SLICE_MAIN]);
		dispatch(updateField(mines));
		dispatch(play());
	},
});

startAppListening({
	predicate: (action, currentState) =>
		(openCell.match(action) || openSurroundingCells.match(action)) &&
		currentState[SLICE_MAIN].status === "play",
	effect: (_action, { dispatch }) => {
		dispatch(play());
	},
});

startAppListening({
	predicate: (action, currentState) =>
		!displayHiddenMines.match(action) && currentState[SLICE_MAIN].status === "lose",
	effect: (_action, { dispatch, getState }) => {
		const state = getState();
		dispatch(displayHiddenMines(state[SLICE_MAIN].field));
	},
});

startAppListening({
	predicate: (action, currentState) =>
		!мarkМineWithFlag.match(action) && currentState[SLICE_MAIN].status === "win",
	effect: (_action, { dispatch, getState }) => {
		const state = getState();
		dispatch(мarkМineWithFlag(state[SLICE_MAIN].field));
	},
});

startAppListening({
	matcher: isAnyOf(start, pageLoad),
	effect: (_action, { dispatch, getState }) => {
		intervalId = setInterval(() => {
			getState()[SLICE_MAIN].status !== "play"
				? clearInterval(intervalId)
				: dispatch(clockTick());
		}, 1000);
	},
});

startAppListening({
	predicate: (action) => openCell.match(action),
	effect: (_action, { getState, dispatch }) => {
		const { field, currentSelectCellId, currentLevel } = getState()[SLICE_MAIN];
		const currentSelectCell = field.find((el) => el.id === currentSelectCellId);
		const surroundingCells = (initialCellId: CellId): Cell[] =>
			getSurroundingCells({
				id: initialCellId,
				limit: Object.values(currentLevel)[0] as number,
				field,
			});

		const emptyCells = new Set<Cell>();

		if (currentSelectCell != null && currentSelectCell.marker === 0) {
			emptyCells.add(currentSelectCell);
			findSurroundingCells(currentSelectCell);
		}

		function findSurroundingCells(currentCell: Cell): void {
			for (const cell of surroundingCells(currentCell.id)) {
				if (cell.state === "closed" && !emptyCells.has(cell) && cell.marker === 0) {
					emptyCells.add(cell);
					findSurroundingCells(cell);
				}
			}
		}

		const notEmptyCells = [...emptyCells]
			.map((el) => surroundingCells(el.id).filter((i) => i.marker !== 0))
			.flat();

		dispatch(openSurroundingCells([...emptyCells, ...new Set(notEmptyCells)]));
	},
});
