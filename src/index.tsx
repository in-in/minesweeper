import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@/components/App";
import { store } from "@/store/store";

import "@/styles/styles.scss";

const root = document.getElementById("root");

if (root != null) {
	const container = createRoot(root);
	container.render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>,
	);
}

if (window.Cypress != null) {
	window.store = store;
}
