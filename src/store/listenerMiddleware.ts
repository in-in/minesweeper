import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";

import {
	changeCellState,
	clockTick,
	displayHiddenMines,
	play,
	start,
	updateField,
} from "@/store/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { SLICE_MAIN } from "@/utils/constants";
import { localStorageWrapper } from "@/utils/localStorageWrapper";
import { placeMines } from "@/utils/placeMines";

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
		changeCellState.match(action) && currentState[SLICE_MAIN].status === "idle",
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
		changeCellState.match(action) && currentState[SLICE_MAIN].status === "play",
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
	actionCreator: start,
	effect: (_action, { dispatch, getState }) => {
		intervalId = setInterval(() => {
			getState()[SLICE_MAIN].status !== "play"
				? clearInterval(intervalId)
				: dispatch(clockTick());
		}, 1000);
	},
});
