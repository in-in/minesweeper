import React from "react";

import { Range } from "@components/Range";
import { Stat } from "@components/Stat";
import { Toggle } from "@components/Toggle";

import st from "./index.module.scss";

const Dashboard = (): JSX.Element => (
	<div className={st.dashboard}>
		<Range />
		<Toggle label="sound" />
		<Toggle label="light/dark" />
		<Stat label="timer" />
		<Stat label="turns" />
		<Stat label="mines" />
	</div>
);

export { Dashboard };
