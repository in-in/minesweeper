import React from "react";

import { mainMachineContext } from "@state/mainMachineContext";

import st from "./index.module.scss";

const Debug = (): JSX.Element => {
	const [state] = mainMachineContext.useActor();

	return (
		<pre className={st.debug}>
			{JSON.stringify([state.value, state.context], null, 2)}
		</pre>
	);
};

export { Debug };
