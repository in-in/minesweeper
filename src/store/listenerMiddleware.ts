import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";

import { changeCellState, play, start, updateField } from "@/store/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { SLICE_MAIN } from "@/utils/constants";
import { isRootState } from "@/utils/isRootState";
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

listenerMiddleware.startListening({
	predicate: () => true,
	effect: (_, { getState }) => {
		const state = JSON.stringify(getState());
		try {
			localStorageWrapper()?.setItem(state);
		} catch (error) {
			console.log(error);
		}
	},
});

listenerMiddleware.startListening({
	predicate: (action, _currentState, previousState) => {
		return (
			start.match(action) &&
			isRootState(previousState, SLICE_MAIN) &&
			previousState[SLICE_MAIN].status === "idle"
		);
	},
	effect: (_action, listenerApi) => {
		const state = listenerApi.getState();

		if (isRootState(state, SLICE_MAIN)) {
			const mines = placeMines(state[SLICE_MAIN]);
			listenerApi.dispatch(updateField(mines));
			listenerApi.dispatch(changeCellState());
		}
	},
});
listenerMiddleware.startListening({
	predicate: (action, currentState) => {
		return (
			play.match(action) &&
			isRootState(currentState, SLICE_MAIN) &&
			currentState[SLICE_MAIN].status === "play"
		);
	},
	effect: (_action, listenerApi) => {
		listenerApi.dispatch(changeCellState());
	},
});
