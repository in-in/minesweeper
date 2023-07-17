import React from "react";

import { Dashboard } from "@components/Dashboard";
import { Field } from "@components/Field";
import { Level } from "@components/Level";

import st from "./index.module.scss";

const Wrapper = (): JSX.Element => (
	<div className={st.wrapper}>
		<Dashboard />
		<Field />
		<Level />
	</div>
);

export { Wrapper };
