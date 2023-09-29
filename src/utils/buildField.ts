import { type Cell, type CellFlag, type CellId } from "@/customTypes/customTypes";

export function buildField(length: number, mines: CellId[] = []): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const flag: CellFlag = mines.includes(id) ? 9 : 0;
			return { id, flag };
		}),
	).flat();
}
