import { configureStore } from "@reduxjs/toolkit";

const reducer = {};

const preloadedState = {
	level: 10,
	minesAmount: 10,
	phase: "idle",
};

const store = configureStore({
	reducer,
	preloadedState,
});

export { store };
