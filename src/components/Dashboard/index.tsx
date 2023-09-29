import React from "react";

import { Button } from "@/components/Button";
import { Range } from "@/components/Range";
import { Stat } from "@/components/Stat";
import { Toggle } from "@/components/Toggle";
import { restart, selectIsPlayStatus } from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Dashboard = (): React.ReactNode => {
	const isPlayStatus = useAppSelector(selectIsPlayStatus);
	const dispatch = useAppDispatch();

	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat label="timer" />
			<Stat label="turns" />
			<Stat label="mines" />
			<Button
				disabled={!isPlayStatus}
				inner={"Restart"}
				modifier={[st.button ?? ""]}
				onClick={() => dispatch(restart())}
				variant="primary"
			/>
		</div>
	);
};

export { Dashboard };
