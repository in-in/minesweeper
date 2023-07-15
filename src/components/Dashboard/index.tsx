import React from "react";

import { Range } from "@components/Range";

import st from "./index.module.scss";

const Dashboard = (): JSX.Element => (
	<div className={st.dashboard}>
		<Range />
	</div>
);

export { Dashboard };
