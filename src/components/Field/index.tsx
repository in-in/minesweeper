import React from "react";

import { Cell } from "@components/Cell";
import { type CSSCustomProperties } from "@customTypes/customTypes";
import { updateGameState } from "@state/gameStateSlice";
import { selectCurrentLevelValue } from "@state/mainSlice";
import { useAppSelector, useAppDispatch } from "@utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	const cells = [];

	if (typeof currentLevelValue !== "undefined") {
		for (let row = 0; row < currentLevelValue; row++) {
			for (let col = 0; col < currentLevelValue; col++) {
				cells.push(
					<Cell
						key={`${row}-${col}`}
						cellRowId={row}
						cellColId={col}
						onClick={() => dispatch(updateGameState("play"))}
					/>,
				);
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
