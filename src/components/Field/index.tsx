import React, { type CSSProperties } from "react";

import { Cell } from "@components/Cell";

import st from "./index.module.scss";

const Field = (): JSX.Element => {
	const currentLevel = 10;
	const style = { "--size": currentLevel } as CSSProperties;

	const cells = [];

	for (let row = 0; row < currentLevel; row++) {
		for (let col = 0; col < currentLevel; col++) {
			cells.push(<Cell key={`${row}-${col}`} cellRowId={row} cellColId={col} />);
		}
	}

	return (
		<div className={st.field} style={style}>
			{cells}
		</div>
	);
};

export { Field };
