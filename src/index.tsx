import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@components/App";
import { store } from "@state/store";
import "@styles/styles.scss";

const container = document.getElementById("root");

if (container != null) {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>,
	);
}
