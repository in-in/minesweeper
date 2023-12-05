import { type Cell, type CellId } from "@/customTypes/customTypes";

type GetSurroundingCells = {
	id: CellId;
	limit: number;
	field?: Cell[];
};

function getSurroundingCells({
	id,
	limit,
}: Omit<GetSurroundingCells, "field">): CellId[];
function getSurroundingCells({
	id,
	limit,
	field,
}: Required<GetSurroundingCells>): Cell[];
function getSurroundingCells({
	id,
	limit,
	field,
}: GetSurroundingCells): CellId[] | Cell[] {
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

	const surroundingCellsId = indexes
		.map(([r, c]) =>
			r != null && c != null && (r >= limit || c >= limit || r < 0 || c < 0)
				? null
				: (`${r}-${c}` as CellId),
		)
		.flatMap((f) => (f != null ? [f] : []));

	return field != null
		? field.filter((cell) => surroundingCellsId.includes(cell.id))
		: surroundingCellsId;
}

export { getSurroundingCells };
