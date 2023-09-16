import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "@state/mainSlice";

import { listenerMiddleware } from "./listenerMiddleware";

const store = configureStore({
	reducer: {
		main: mainReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
