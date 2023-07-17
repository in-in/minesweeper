import React from "react";

import { Dashboard } from "@components/Dashboard";
import { Field } from "@components/Field";

import st from "./index.module.scss";

const Wrapper = (): JSX.Element => (
	<div className={st.wrapper}>
		<Dashboard />
		<Field />
	</div>
);

export { Wrapper };
