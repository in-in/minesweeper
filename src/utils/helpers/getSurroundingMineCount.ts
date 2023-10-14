import { type CellId, type CellMarker } from "@/customTypes/customTypes";

type getSurroundingMineCountOptions = {
	id: CellId;
	limit: number;
	mines: CellId[];
};

export function getSurroundingMineCount({
	id,
	limit,
	mines,
}: getSurroundingMineCountOptions): CellMarker {
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
			(sum: CellMarker, id) =>
				mines.includes(id) ? ((sum += 1) as CellMarker) : sum,
			0,
		);
}
