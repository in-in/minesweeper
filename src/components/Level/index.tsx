import { useMachine } from "@xstate/react";
import React from "react";

import { Button } from "@components/Button";
import { machine } from "@state/machine";

import st from "./index.module.scss";

const Level = (): JSX.Element => {
	const [state, send] = useMachine(machine);
	const { currentLevel } = state.context;
	const buttons = [
		["easy", "TO_EASY"],
		["medium", "TO_MEDIUM"],
		["hard", "TO_HARD"],
	] as const;

	return (
		<div className={st.level}>
			{buttons.map((el) => {
				return (
					<Button
						key={el[0]}
						inner={el[0]}
						variant={
							Object.keys(currentLevel)[0] === el[0] ? "active" : "primary"
						}
						onClick={(): void => {
							send({ type: el[1] });
						}}
						modifier={[st.button ?? ""]}
					/>
				);
			})}
		</div>
	);
};

export { Level };
