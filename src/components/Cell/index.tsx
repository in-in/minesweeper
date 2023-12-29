import type { CellId, CellState, Cell as ICell } from "@/customTypes/customTypes";

import { Flag, LocalFireDepartment } from "@mui/icons-material";
import { Box, type SxProps } from "@mui/material";

import { openCell, revealSurroundingCells, toggleCellFlag } from "@/store/mainSlice";
import { selectStatus } from "@/store/selectors";
import { cellMarkerColor } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";

import st from "./index.module.scss";

interface CellProps {
	cell: ICell;
}

const CellInner = ({ marker }: Pick<ICell, "marker">): React.ReactNode => {
	if (marker === 0) {
		return null;
	}

	return marker === 9 ? <LocalFireDepartment /> : marker;
};

const Cell = ({ cell }: CellProps): React.ReactNode => {
	const { id, marker, state } = cell;
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();

	const handleClick = (state: CellState, cell: ICell): void => {
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
		if (event.button === 1 || (event.type === "mouseleave" && event.buttons === 4)) {
			event.stopPropagation();
			event.preventDefault();
			dispatch(revealSurroundingCells({ id, highlight }));
		}
	};

	const styles: SxProps = {
		color:
			state === "opened" ? cellMarkerColor[marker][900] : cellMarkerColor[0][900],
		bgcolor:
			state === "opened" ? cellMarkerColor[marker].A100 : cellMarkerColor[0][700],
		opacity: state === "highlighted" ? 0.6 : 1,
		border: `1px solid ${cellMarkerColor[0][800]}`,
	};

	return (
		<Box
			className={st.cell}
			data-testhighlight={state === "highlighted" ? true : null}
			data-testid={marker}
			data-testopen={state === "opened" ? true : null}
			sx={styles}
			onClick={() => {
				handleClick(state, cell);
			}}
			onContextMenu={(event) => {
				handleContextMenu(event, id);
			}}
			onMouseDown={(event) => {
				handleMiddleClick(event, id, true);
			}}
			onMouseLeave={(event) => {
				handleMiddleClick(event, id, false);
			}}
			onMouseUp={(event) => {
				handleMiddleClick(event, id, false);
			}}
		>
			{state === "opened" && <CellInner marker={marker} />}
			{state === "flagged" && (
				<Flag
					sx={{
						color:
							status === "lose" ? cellMarkerColor[9].A400 : cellMarkerColor[4].A400,
					}}
				/>
			)}
		</Box>
	);
};

export { Cell };
