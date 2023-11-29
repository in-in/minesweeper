/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { type Cypress } from "cypress";

import { type GlobalState } from "@/customTypes/customTypes";

import { type AppStore } from "@/store/store";

export {};

declare global {
	interface Window {
		Cypress: Cypress;
		store: AppStore;
		initialState: GlobalState;
	}
}

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId: (id: string | number) => Chainable<JQuery>;
			findByTestId: (id: string | number) => Chainable<JQuery>;
			start: () => void;
			getStore: () => Chainable<AppStore>;
		}
	}
}
