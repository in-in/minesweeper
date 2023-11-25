import {
	type Cell,
	type CellId,
	type CellMarker,
	type CellState,
	type MainState,
} from "@/customTypes/customTypes";

import { getSurroundingMineCount } from "@/utils/helpers/getSurroundingMineCount";

type buildFieldOptions = {
	length: number;
	mines?: CellId[];
	selectCellId?: MainState["currentSelectCellId"];
};

function buildField({
	length,
	mines = [],
	selectCellId = null,
}: buildFieldOptions): Cell[] {
	return Array.from({ length }, (_, row) =>
		Array.from({ length }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const marker: CellMarker = mines.includes(id)
				? 9
				: getSurroundingMineCount({ id, limit: length, mines });
			const state: CellState = selectCellId === id ? "opened" : "closed";
			return { id, marker, state };
		}),
	).flat();
}

export { buildField };
