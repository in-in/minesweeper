import { type CellId } from "@/customTypes/customTypes";

export function buildField(length: number): CellId[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): CellId => `${row}-${col}`),
	).flat();
}
