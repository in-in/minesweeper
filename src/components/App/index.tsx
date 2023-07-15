import React from "react";

import { Wrapper } from "@components/Wrapper";

import st from "./index.module.scss";

const App = (): JSX.Element => (
	<div className={st.layout}>
		<Wrapper />
	</div>
);

export { App };
