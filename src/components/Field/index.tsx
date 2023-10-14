import React from "react";

import { type CSSCustomProperties } from "@/customTypes/customTypes";

import { Cell } from "@/components/Cell";
import { Dialog } from "@/components/Dialog";
import { changeCellState } from "@/store/mainSlice";
import { selectCurrentLevelValue, selectField } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	return (
		<div className={st.field} style={style}>
			<Dialog />
			{field.map(({ id, marker, state }) => (
				<Cell
					key={id}
					marker={marker}
					state={state}
					onClick={() => dispatch(changeCellState(id))}
				/>
			))}
		</div>
	);
};

export { Field };
