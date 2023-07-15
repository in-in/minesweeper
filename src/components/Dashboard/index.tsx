import React from "react";

import { Range } from "@components/Range";
import { Toggle } from "@components/Toggle";

import st from "./index.module.scss";

const Dashboard = (): JSX.Element => (
	<div className={st.dashboard}>
		<Range />
		<Toggle label="sound" />
		<Toggle label="light/dark" />
	</div>
);

export { Dashboard };
