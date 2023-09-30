import { type Cell, type CellFlag, type CellId } from "@/customTypes/customTypes";

import { getSurroundingMineCount } from "./getSurroundingMineCount";

export function buildField(length: number, mines: CellId[] = []): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const flag: CellFlag = mines.includes(id)
				? 9
				: getSurroundingMineCount(id, length, mines);
			return { id, flag };
		}),
	).flat();
}
