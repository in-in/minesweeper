import { configureStore } from "@reduxjs/toolkit";

import { type GlobalState } from "@customTypes/customTypes";
import gameReducer from "@state/gameSlice";
import mainReducer from "@state/mainSlice";
import * as constants from "@utils/constants";
import { localStorageWrapper } from "@utils/localStorageWrapper";

import { listenerMiddleware } from "./listenerMiddleware";

let preloadedState = constants.initialState as GlobalState;

const persistState = localStorageWrapper()?.getItem();

if (persistState != null) {
	preloadedState = persistState;
}

const store = configureStore({
	reducer: {
		[constants.sliceMain]: mainReducer,
		[constants.sliceGame]: gameReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
