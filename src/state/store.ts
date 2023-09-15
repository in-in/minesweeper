import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "@state/mainSlice";

const store = configureStore({
	reducer: {
		main: mainReducer,
	},
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
