import React from "react";

import { Button } from "@/components/Button";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { Toggle } from "@/components/Toggle";
import { restart, selectClockTime, selectIsIdleStatus } from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Dashboard = (): React.ReactNode => {
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const clockTime = useAppSelector(selectClockTime);
	const dispatch = useAppDispatch();

	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat counter={clockTime} label="timer" />
			<Stat label="turns" />
			<Stat label="mines" />
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
