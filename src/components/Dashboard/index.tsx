import React from "react";

import { Button } from "@components/Button";
import { Range } from "@components/Range";
import { Stat } from "@components/Stat";
import { Toggle } from "@components/Toggle";

import st from "./index.module.scss";

const Dashboard = (): React.ReactNode => {
	return (
		<div className={st.dashboard}>
			<Range />
			<Toggle label="sound" />
			<Toggle label="light/dark" />
			<Stat label="timer" />
			<Stat label="turns" />
			<Stat label="mines" />
			<Button
				inner={<>Start</>}
				variant="primary"
				onClick={(): void => {}}
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Dashboard };
