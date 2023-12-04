import {
	type Cell,
	type CellId,
	type CellState,
	type CSSCustomProperties,
} from "@/customTypes/customTypes";

import { Cell as FieldCell } from "@/components/Cell";
import { openCell, revealSurroundingCells, toggleCellFlag } from "@/store/mainSlice";
import { selectCurrentLevelValue, selectField } from "@/store/selectors";
import { addTestId } from "@/utils/helpers/addTestId";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	const handleClick = (state: CellState, cell: Cell): void => {
		if (state === "closed") {
			dispatch(openCell(cell));
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

	const handleMiddleClick = (
		event: React.MouseEvent<HTMLElement>,
		id: CellId,
		highlight: boolean,
	): void => {
		if (event.button === 1) {
			event.stopPropagation();
			event.preventDefault();
			dispatch(revealSurroundingCells({ id, highlight }));
		}
	};

	return (
		<div className={st.field} {...addTestId("field")} style={style}>
			{field.map((cell) => {
				const { id, marker, state } = cell;
				return (
					<FieldCell
						key={id}
						marker={marker}
						state={state}
						onClick={() => {
							handleClick(state, cell);
						}}
						onContextMenu={(event) => {
							handleContextMenu(event, id);
						}}
						onMouseDown={(event) => {
							handleMiddleClick(event, id, true);
						}}
						onMouseUp={(event) => {
							handleMiddleClick(event, id, false);
						}}
					/>
				);
			})}
		</div>
	);
};

export { Field };
