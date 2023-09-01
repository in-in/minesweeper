import React from "react";

import { Button } from "@components/Button";

import st from "./index.module.scss";

const Level = (): JSX.Element => {
	const currentLevel = 10;
	const buttons = [
		["easy", "TO_EASY"],
		["medium", "TO_MEDIUM"],
		["hard", "TO_HARD"],
	] as const;

	return (
		<div className={st.level}>
			<p className={st.title}>Level</p>
			<ul className={st.group}>
				{buttons.map((el) => {
					return (
						<li key={el[0]}>
							<Button
								inner={el[0]}
								variant={
									Object.keys(currentLevel)[0] === el[0] ? "active" : "primary"
								}
								onClick={(): void => {}}
								modifier={[st.button ?? ""]}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Level };
