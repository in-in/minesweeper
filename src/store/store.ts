import { configureStore } from "@reduxjs/toolkit";

import { type GlobalState } from "@/customTypes/customTypes";

import { listenerMiddleware } from "@/store/listenerMiddleware";
import mainReducer from "@/store/mainSlice";
import { INITIAL_STATE, SLICE_MAIN } from "@/utils/constants";
import { localStorageWrapper } from "@/utils/helpers/localStorageWrapper";

let preloadedState = INITIAL_STATE as GlobalState;

const persistState = localStorageWrapper()?.getItem();

if (persistState != null) {
	preloadedState = persistState;
}

const store = configureStore({
	reducer: {
		[SLICE_MAIN]: mainReducer,
	},
	preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
