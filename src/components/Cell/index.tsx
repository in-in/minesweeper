import type { CellId, Cell as ICell } from "@/customTypes/customTypes";

import { Flag, LocalFireDepartment } from "@mui/icons-material";
import { Box, type SxProps } from "@mui/material";

import explosion from "@/assets/sounds/explosion.mp3";
import highlightSound from "@/assets/sounds/highlight.mp3";
import pop from "@/assets/sounds/pop.mp3";
import revealCell from "@/assets/sounds/revealCell.mp3";
import stick from "@/assets/sounds/stick.mp3";
import { openCell, revealSurroundingCells, toggleCellFlag } from "@/store/mainSlice";
import { selectStatus } from "@/store/selectors";
import { cellMarkerColor } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSound } from "@/utils/hooks/useSound";

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
	const playRevealCell = useSound(revealCell);
	const playExplosion = useSound(explosion);
	const playStick = useSound(stick);
	const playPop = useSound(pop);
	const playHighlight = useSound(highlightSound);

	const handleClick = (cell: ICell): void => {
		if (cell.state === "closed") {
			dispatch(openCell(cell));
		}
		if (cell.marker === 9 && cell.state !== "flagged") {
			playExplosion();
		} else if (cell.state === "closed") {
			playRevealCell();
		}
	};

	const handleContextMenu = (
		event: React.MouseEvent<HTMLElement>,
		cell: ICell,
	): void => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(toggleCellFlag(cell.id));

		if (cell.state === "flagged") {
			playPop();
		} else if (cell.state !== "opened") {
			playStick();
		}
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
			if (highlight) {
				playHighlight();
			}
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
			data-testpos={id}
			sx={styles}
			onClick={() => {
				handleClick(cell);
			}}
			onContextMenu={(event) => {
				handleContextMenu(event, cell);
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
