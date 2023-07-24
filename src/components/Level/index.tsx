import { useMachine } from "@xstate/react";
import React from "react";

import { Button } from "@components/Button";
import { machine } from "@state/machine";

import st from "./index.module.scss";

const Level = (): JSX.Element => {
	const [, send] = useMachine(machine);

	return (
		<div className={st.level}>
			<Button
				data-level={10}
				inner={<>Easy</>}
				variant="primary"
				onClick={(): void => {
					send("TO_EASY");
				}}
				modifier={[st.button ?? ""]}
			/>
			<Button
				data-level={15}
				inner={<>Medium</>}
				variant="primary"
				onClick={(): void => {
					send("TO_MEDIUM");
				}}
				modifier={[st.button ?? ""]}
			/>
			<Button
				data-level={25}
				inner={<>Hard</>}
				variant="primary"
				onClick={(): void => {
					send("TO_HARD");
				}}
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Level };
