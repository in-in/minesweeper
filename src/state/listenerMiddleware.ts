import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";

import { projectName } from "@utils/projectName";

import type { RootState, AppDispatch } from "./store";

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
	effect: (_action, listenerApi) => {
		const state = JSON.stringify(listenerApi.getState());
		try {
			localStorage.setItem(projectName, state);
		} catch (error) {
			console.log(error);
		}
	},
});
