import React from "react";
import "@styles/styles.scss";
import { createRoot } from "react-dom/client";
import { App } from "@components/App";

const container = document.getElementById("root");

if (container != null) {
	const root = createRoot(container);
	root.render(<App />);
}
