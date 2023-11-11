import React from "react";

import {
	type CellId,
	type CellState,
	type CSSCustomProperties,
} from "@/customTypes/customTypes";

import { Cell } from "@/components/Cell";
import { Dialog } from "@/components/Dialog";
import { openCell, toggleCellFlag } from "@/store/mainSlice";
import { selectCurrentLevelValue, selectField } from "@/store/selectors";
import { addTestId } from "@/utils/helpers/addTestId";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	const handleClick = (state: CellState, id: CellId): void => {
		if (state === "closed") {
			dispatch(openCell(id));
		}
	};
	const handleContextMenu = (
		event: React.MouseEvent<HTMLElement>,
		id: CellId,
	): void => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(toggleCellFlag(id));
	};

	return (
		<div className={st.field} {...addTestId("field")} style={style}>
			<Dialog />
			{field.map(({ id, marker, state }) => (
				<Cell
					key={id}
					marker={marker}
					state={state}
					onClick={() => {
						handleClick(state, id);
					}}
					onContextMenu={(event) => {
						handleContextMenu(event, id);
					}}
				/>
			))}
		</div>
	);
};

export { Field };
