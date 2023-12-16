import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@/components/App";
import { store } from "@/store/store";

import "@/styles/styles.scss";

const root = document.getElementById("root");

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

if (root != null) {
	const container = createRoot(root);
	container.render(
		<StrictMode>
			<Provider store={store}>
				<ThemeProvider theme={darkTheme}>
					<App />
				</ThemeProvider>
			</Provider>
		</StrictMode>,
	);
}

if (window.Cypress != null) {
	window.store = store;
}
