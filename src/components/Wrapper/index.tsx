import React from "react";

import { Dashboard } from "@components/Dashboard";
import { Field } from "@components/Field";
import { Level } from "@components/Level";
import { Scoretable } from "@components/Scoretable";

import st from "./index.module.scss";

const Wrapper = (): JSX.Element => (
	<div className={st.wrapper}>
		<Dashboard />
		<Field />
		<Level />
		<Scoretable />
	</div>
);

export { Wrapper };
