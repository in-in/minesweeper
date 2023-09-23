import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "@/store/store";
import { localStorageWrapper } from "@/utils/localStorageWrapper";

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
