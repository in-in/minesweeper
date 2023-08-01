import React from "react";

import { machineContext } from "@components/App";
import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { Stat } from "@components/Stat";
import { Toggle } from "@components/Toggle";

import st from "./index.module.scss";

const Dashboard = (): JSX.Element => {
	const [state, send] = machineContext.useActor();
	const buttonText = state.matches("idle") ? "Start" : "Stop";

	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat label="timer" />
			<Stat label="turns" />
			<Stat label="mines" />
			<Button
				inner={
					<>
						{buttonText} <br /> Game
					</>
				}
				variant="primary"
				onClick={(): void => {
					send("TOGGLE");
				}}
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Dashboard };
