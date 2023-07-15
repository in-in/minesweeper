import React from "react";

import { Dashboard } from "@components/Dashboard";

import st from "./index.module.scss";

const Wrapper = (): JSX.Element => (
	<div className={st.wrapper}>
		<Dashboard />
	</div>
);

export { Wrapper };
