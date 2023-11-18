import { type CellId } from "@/customTypes/customTypes";

type surroundingCellsOptions = {
	id: CellId;
	limit: number;
};

function getSurroundingCells({ id, limit }: surroundingCellsOptions): CellId[] {
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
				: (`${r}-${c}` as CellId),
		)
		.flatMap((f) => (f != null ? [f] : []));
}

export { getSurroundingCells };
