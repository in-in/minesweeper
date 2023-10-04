import { type Cell, type CellId, type CellMarker } from "@/customTypes/customTypes";

import { getSurroundingMineCount } from "@/utils/getSurroundingMineCount";

export function buildField(length: number, mines: CellId[] = []): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const marker: CellMarker = mines.includes(id)
				? 9
				: getSurroundingMineCount(id, length, mines);
			return { id, marker, state: "closed" };
		}),
	).flat();
}
