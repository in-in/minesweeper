import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControlLabel,
	IconButton,
	Switch,
	type SxProps,
} from "@mui/material";

import click from "@/assets/sounds/click.mp3";
import switchControl from "@/assets/sounds/switch.mp3";
import { Level } from "@/components/Level";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import {
	restart,
	showScoretable,
	switchTheme,
	toggleSound,
} from "@/store/mainSlice";
import {
	selectClockTime,
	selectFlagCounter,
	selectIsIdleStatus,
	selectIsSoundEnabled,
	selectScoretable,
	selectTheme,
	selectTurnCounter,
} from "@/store/selectors";
import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSound } from "@/utils/hooks/useSound";

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectTurnCounter);
	const flags = useAppSelector(selectFlagCounter);
	const theme = useAppSelector(selectTheme);
	const scoretable = useAppSelector(selectScoretable);
	const isSoundEnabled = useAppSelector(selectIsSoundEnabled);
	const dispatch = useAppDispatch();

	const playClick = useSound(click);
	const playSwitch = useSound(switchControl);

	const stylesButton: SxProps = {
		width: { xs: "50%", sm: "auto" },
		order: { xs: 3, sm: 0 },
	};

	const handleChange = (): void => {
		dispatch(toggleSound());
		playSwitch();
	};

	const handleClickScoretable = (): void => {
		dispatch(showScoretable());
		playClick();
	};

	const handleClickRestart = (): void => {
		dispatch(restart());
		playClick();
	};

	const handleClickTheme = (): void => {
		dispatch(switchTheme());
		playSwitch();
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: { xs: "space-evenly", sm: "start" },
				alignItems: { xs: "flex-start", sm: "center" },
				flexDirection: { xs: "row", sm: "column-reverse" },
				rowGap: 2,
				columnGap: { xs: 1, sm: 2 },
			}}
		>
			{scoretable.length > 0 && (
				<Button
					data-testid="scoretableButton"
					size="medium"
					sx={stylesButton}
					variant="contained"
					onClick={handleClickScoretable}
				>
					Scoretable
				</Button>
			)}
			<Level />
			<Range />
			<FormControlLabel
				control={<Switch checked={isSoundEnabled} onChange={handleChange} />}
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
				<IconButton onClick={handleClickTheme}>
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
				size="medium"
				sx={stylesButton}
				variant="contained"
				onClick={handleClickRestart}
			>
				Restart
			</Button>
		</Box>
	);
};

export { Dashboard };
