import {
	type Cell,
	type CellId,
	type CellMarker,
	type CellState,
	type MainState,
} from "@/customTypes/customTypes";

import { getSurroundingMineCount } from "@/utils/getSurroundingMineCount";

export function buildField(
	length: number,
	mines: CellId[] = [],
	openCell: MainState["currentCell"] = null,
): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const marker: CellMarker = mines.includes(id)
				? 9
				: getSurroundingMineCount(id, length, mines);
			const state: CellState = openCell === id ? "opened" : "closed";
			return { id, marker, state };
		}),
	).flat();
}
