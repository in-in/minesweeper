import React from "react";

import { Button } from "@/components/Button";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { Toggle } from "@/components/Toggle";
import { restart } from "@/store/mainSlice";
import {
	selectClockTime,
	selectflagCount,
	selectIsIdleStatus,
	selectOpenCellCount,
} from "@/store/selectors";
import { formatClockTimeToHHMMSS } from "@/utils/helpers/formatClockTimeToHHMMSS";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectOpenCellCount);
	const flags = useAppSelector(selectflagCount);
	const dispatch = useAppDispatch();

	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat counter={formatClockTimeToHHMMSS(clockTime)} label="timer" />
			<Stat counter={turns} label="turns" />
			<Stat counter={flags} label="flags" />
			<Button
				disabled={isIdleStatus}
				inner={"Restart"}
				modifier={[st.button ?? ""]}
				variant="primary"
				onClick={() => dispatch(restart())}
			/>
		</div>
	);
};

export { Dashboard };
