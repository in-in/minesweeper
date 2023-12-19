import { Button, FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/system";

import { Level } from "@/components/Level";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { restart } from "@/store/mainSlice";
import {
	selectClockTime,
	selectflagCounter,
	selectIsIdleStatus,
	selectTurnCounter,
} from "@/store/selectors";
import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const StyledFormControlLabel = styled(FormControlLabel)({
	marginInline: 0,
});

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectTurnCounter);
	const flags = useAppSelector(selectflagCounter);
	const dispatch = useAppDispatch();

	return (
		<div className={st.dashboard}>
			<Level />
			<Range />
			<StyledFormControlLabel
				control={<Switch />}
				label="Sound"
				labelPlacement="top"
				value="sound"
			/>
			<StyledFormControlLabel
				control={<Switch />}
				label="Theme"
				labelPlacement="top"
				value="theme"
			/>
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
		</div>
	);
};

export { Dashboard };
