import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";
import { addListener, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import {
	clockTick,
	displayHiddenMines,
	openCell,
	pageLoad,
	play,
	start,
	updateField,
	мarkМineWithFlag,
} from "@/store/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { SLICE_MAIN } from "@/utils/constants";
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
		openCell.match(action) && currentState[SLICE_MAIN].status === "play",
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
