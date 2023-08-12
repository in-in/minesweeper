import React, { type CSSProperties } from "react";

import { Cell } from "@components/Cell";
import { mainMachineContext } from "@state/mainMachineContext";

import st from "./index.module.scss";

const Field = (): JSX.Element => {
	const currentLevel = mainMachineContext.useSelector(
		(state) => Object.values(state.context.currentLevel)[0],
	);
	const style = { "--size": currentLevel } as CSSProperties;

	const cells = [];

	if (currentLevel !== undefined) {
		for (let row = 0; row < currentLevel; row++) {
			for (let col = 0; col < currentLevel; col++) {
				cells.push(<Cell key={`${row}-${col}`} cellRowId={row} cellColId={col} />);
			}
		}
	}

	return (
		<div className={st.field} style={style}>
			{cells}
		</div>
	);
};

export { Field };
