import type { CellId, CellState, Cell as ICell } from "@/customTypes/customTypes";

import { Flag, LocalFireDepartment } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
	amber,
	blue,
	cyan,
	green,
	grey,
	lime,
	orange,
	red,
	teal,
	yellow,
} from "@mui/material/colors";

import { openCell, revealSurroundingCells, toggleCellFlag } from "@/store/mainSlice";
import { selectStatus } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

interface CellProps {
	cell: ICell;
}

const mapColor = {
	0: grey,
	1: blue,
	2: cyan,
	3: teal,
	4: green,
	5: lime,
	6: yellow,
	7: amber,
	8: orange,
	9: red,
};

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
		if (event.button === 1 || event.type === "mouseleave") {
			event.stopPropagation();
			event.preventDefault();
			dispatch(revealSurroundingCells({ id, highlight }));
		}
	};

	return (
		<Box
			className={st.cell}
			data-testid={marker}
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
			sx={{
				color: state === "opened" ? mapColor[marker][900] : grey[900],
				bgcolor: state === "opened" ? mapColor[marker].A100 : grey[700],
				opacity: state === "highlighted" ? 0.6 : 1,
				border: `1px solid ${grey[800]}`,
			}}
		>
			{state === "opened" && <CellInner marker={marker} />}
			{state === "flagged" && (
				<Flag sx={{ color: status === "lose" ? red.A400 : green.A400 }} />
			)}
		</Box>
	);
};

export { Cell };
