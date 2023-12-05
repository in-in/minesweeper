import { type CellId, type CellMarker } from "@/customTypes/customTypes";

import { getSurroundingCells } from "./getSurroundingCells";

type GetSurroundingMineCount = {
	id: CellId;
	limit: number;
	mines: CellId[];
};

function getSurroundingMineCount({
	id,
	limit,
	mines,
}: GetSurroundingMineCount): CellMarker {
	return getSurroundingCells({ id, limit }).reduce(
		(sum: CellMarker, id) => (mines.includes(id) ? ((sum += 1) as CellMarker) : sum),
		0,
	);
}

export { getSurroundingMineCount };
