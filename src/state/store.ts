import { configureStore } from "@reduxjs/toolkit";

import gameStateReducer from "@state/gameStateSlice";
import mainReducer from "@state/mainSlice";
import * as constants from "@utils/constants";

import { listenerMiddleware } from "./listenerMiddleware";

const store = configureStore({
	reducer: {
		[constants.sliceMain]: mainReducer,
		[constants.sliceGameState]: gameStateReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
