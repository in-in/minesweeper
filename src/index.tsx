import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@components/App";
import { Debug } from "@components/Debug";
import { mainMachineContext } from "@state/mainMachineContext";
import "@styles/styles.scss";

const container = document.getElementById("root");

if (container != null) {
	const root = createRoot(container);
	root.render(
		<mainMachineContext.Provider>
			<StrictMode>
				<Debug />
				<App />
			</StrictMode>
		</mainMachineContext.Provider>,
	);
}
