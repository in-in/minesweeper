import { Button } from "@mui/material";

import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { Toggle } from "@/components/Toggle";
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

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectTurnCounter);
	const flags = useAppSelector(selectflagCounter);
	const dispatch = useAppDispatch();

	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat
				counter={formatClockTimeToHHMMSS(clockTime)}
				data-testid="stat-timer"
				label="timer"
			/>
			<Stat counter={turns} data-testid="stat-turns" label="turns" />
			<Stat counter={flags} data-testid="stat-flags" label="flags" />
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
