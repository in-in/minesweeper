import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, Button, FormControlLabel, IconButton, Switch } from "@mui/material";

import { Level } from "@/components/Level";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { restart, showScoretable, switchTheme } from "@/store/mainSlice";
import {
	selectClockTime,
	selectflagCounter,
	selectIsIdleStatus,
	selectTheme,
	selectTurnCounter,
} from "@/store/selectors";
import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectTurnCounter);
	const flags = useAppSelector(selectflagCounter);
	const theme = useAppSelector(selectTheme);
	const dispatch = useAppDispatch();

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: { xs: "center", sm: "start" },
				alignItems: { xs: "flex-start", sm: "center" },
				flexDirection: { sm: "column-reverse" },
				gap: 2,
			}}
		>
			<Button
				data-testid="scoretable"
				size="medium"
				variant="contained"
				onClick={() => dispatch(showScoretable())}
			>
				Scoretable
			</Button>
			<Level />
			<Range />
			<FormControlLabel
				control={<Switch />}
				label="Sound"
				labelPlacement="top"
				sx={{ marginInline: 0 }}
				value="sound"
			/>
			<Box
				data-testid="theme-button"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textTransform: "capitalize",
				}}
			>
				{theme} mode
				<IconButton onClick={() => dispatch(switchTheme())}>
					{theme === "dark" ? <Brightness7 /> : <Brightness4 />}
				</IconButton>
			</Box>
			<Stat
				counter={formatClockTimeToHHMMSS(clockTime)}
				data-testid="stat-timer"
				label="Timer"
			/>
			<Stat counter={turns} data-testid="stat-turns" label="Turns" />
			<Stat counter={flags} data-testid="stat-flags" label="Flags" />
			<Button
				data-testid="restart"
				disabled={isIdleStatus}
				size="large"
				variant="contained"
				onClick={() => dispatch(restart())}
			>
				Restart
			</Button>
		</Box>
	);
};

export { Dashboard };
