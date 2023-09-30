import { type CellFlag, type CellId } from "@/customTypes/customTypes";

export function getSurroundingMineCount(
	id: CellId,
	limit: number,
	mines: CellId[],
): CellFlag {
	const [i = 0, j = 0] = id.split("-").map(Number);
	const indexes = [
		[i - 1, j],
		[i, j - 1],
		[i - 1, j - 1],
		[i + 1, j],
		[i, j + 1],
		[i + 1, j + 1],
		[i + 1, j - 1],
		[i - 1, j + 1],
	];

	return indexes
		.map(([r, c]) =>
			r != null && c != null && (r >= limit || c >= limit || r < 0 || c < 0)
				? null
				: `${r}-${c}`,
		)
		.flatMap((f) => (f != null ? [f] : []))
		.reduce(
			(sum: CellFlag, id) => (mines.includes(id) ? ((sum += 1) as CellFlag) : sum),
			0,
		);
}
