import { useMachine } from "@xstate/react";
import React from "react";

import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { Stat } from "@components/Stat";
import { Toggle } from "@components/Toggle";
import { machine } from "@state/machine";

import st from "./index.module.scss";

const Dashboard = (): JSX.Element => {
	const [current, send] = useMachine(machine);
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
					current.matches("idle") ? (
						<>
							New <br /> Game
						</>
					) : (
						"Restart"
					)
				}
				variant="primary"
				onClick={(): void => {
					send("START");
				}}
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Dashboard };
