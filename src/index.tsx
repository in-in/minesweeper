import React, { StrictMode } from "react";
import { Provider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createRoot } from "react-dom/client";

import { App } from "@/components/App";
import { store } from "@/store/store";

import "@/styles/styles.scss";

const container = document.getElementById("root");
const darkTheme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
	palette: {
		mode: "dark",
	},
});

if (container != null) {
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={darkTheme}>
					<App />
				</ThemeProvider>
			</Provider>
		</StrictMode>,
	);
}
