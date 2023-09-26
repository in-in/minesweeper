import React from "react";

import { Cell } from "@/components/Cell";
import { type CSSCustomProperties } from "@/customTypes/customTypes";
import { updateGameStatus, selectField } from "@/store/gameSlice";
import { selectCurrentLevelValue } from "@/store/mainSlice";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	return (
		<div className={st.field} style={style}>
			{field.map((id) => (
				<Cell
					key={id}
					cellRowId={0}
					cellColId={0}
					data-testid={id}
					onClick={() => {
						dispatch(
							updateGameStatus({
								status: "play",
								ignoredCell: id,
							}),
						);
					}}
				/>
			))}
		</div>
	);
};

export { Field };
