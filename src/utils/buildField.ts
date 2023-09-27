import { type Cell } from "@/customTypes/customTypes";

export function buildField(length: number): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from(
			{ length },
			(_, col): Cell => ({
				id: `${row}-${col}`,
				flag: 0,
			}),
		),
	).flat();
}
