import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { type GlobalState } from "@/customTypes/customTypes";

import mainReducer from "@/store/mainSlice";
import type { AppStore, RootState } from "@/store/store";
import { INITIAL_STATE, SLICE_MAIN } from "@/utils/constants";

type ExtendedRenderOptions = {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
} & Omit<RenderOptions, "queries">;

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = INITIAL_STATE as GlobalState,
		store = configureStore({
			reducer: { [SLICE_MAIN]: mainReducer },
			preloadedState,
		}),
		...renderOptions
	}: ExtendedRenderOptions = {},
): {
	store: AppStore;
} {
	function Wrapper({
		children,
	}: PropsWithChildren<Record<string, unknown>>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
