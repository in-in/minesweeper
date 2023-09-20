import React from "react";

import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { Stat } from "@components/Stat";
import { Toggle } from "@components/Toggle";
import { selectIsPlayStatus, updateGameState } from "@state/gameStateSlice";
import { useAppSelector, useAppDispatch } from "@utils/hooks";

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
				inner={"Restart"}
				variant="primary"
				disabled={!isPlayStatus}
				onClick={() => dispatch(updateGameState("idle"))}
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Dashboard };
