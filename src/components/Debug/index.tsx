import React from "react";

import { machineContext } from "@components/App";

import st from "./index.module.scss";

const Debug = (): JSX.Element => {
	const [state] = machineContext.useActor();

	return (
		<div>
			<pre className={st.debug}>
				{JSON.stringify([state.value, state.context], null, 2)}
			</pre>
		</div>
	);
};

export { Debug };
