import { createActorContext } from "@xstate/react";
import React from "react";

import { Wrapper } from "@components/Wrapper";
import { mainMachine } from "@state/main.machine";

import st from "./index.module.scss";

export const machineContext = createActorContext(mainMachine);

const App = (): JSX.Element => (
	<div className={st.layout}>
		<machineContext.Provider>
			<Wrapper />
		</machineContext.Provider>
	</div>
);

export { App };
