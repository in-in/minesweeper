import { CssBaseline, Link, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

import { Wrapper } from "@/components/Wrapper";
import { pageLoad } from "@/store/mainSlice";
import { selectTheme } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";

import st from "./index.module.scss";

const App = (): React.ReactNode => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const handleLoad = (): void => {
			dispatch(pageLoad());
		};
		window.addEventListener("load", handleLoad);
		return () => {
			window.removeEventListener("load", handleLoad);
		};
	});

	const theme = useAppSelector(selectTheme);

	const customTheme = createTheme({
		components: {
			MuiButtonBase: {
				defaultProps: {
					disableRipple: true,
				},
			},
		},
		palette: {
			mode: theme,
		},
	});
	return (
		<ThemeProvider theme={customTheme}>
			<CssBaseline enableColorScheme />
			<div className={st.layout}>
				<Wrapper />
				<Typography
					component="small"
					sx={{ color: "text.secondary" }}
					variant="subtitle2"
				>
					©&nbsp;
					<Link
						href="https://bit.ly/githubprod"
						rel="noopener noreferrer"
						target="_blank"
						underline="hover"
					>
						in-in
					</Link>
					, 2024
				</Typography>
			</div>
		</ThemeProvider>
	);
};

export { App };
