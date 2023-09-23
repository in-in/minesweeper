import { configureStore } from "@reduxjs/toolkit";

import { type GlobalState } from "@/customTypes/customTypes";
import gameReducer from "@/store/gameSlice";
import mainReducer from "@/store/mainSlice";
import { SLICE_MAIN, INITIAL_STATE, SLICE_GAME } from "@/utils/constants";
import { localStorageWrapper } from "@/utils/localStorageWrapper";

import { listenerMiddleware } from "./listenerMiddleware";

let preloadedState = INITIAL_STATE as GlobalState;

const persistState = localStorageWrapper()?.getItem();

if (persistState != null) {
	preloadedState = persistState;
}

const store = configureStore({
	reducer: {
		[SLICE_MAIN]: mainReducer,
		[SLICE_GAME]: gameReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
