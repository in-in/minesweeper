import {
	type Cell,
	type CellId,
	type CellMarker,
	type CellState,
	type MainState,
} from "@/customTypes/customTypes";

import { type LEVELS } from "@/utils/constants";
import { getSurroundingMineCount } from "@/utils/helpers/getSurroundingMineCount";

type BuildField = {
	size: (typeof LEVELS)[number]["size"];
	mines?: CellId[];
	selectCellId?: MainState["currentSelectCellId"];
};

function buildField({ size, mines = [], selectCellId = null }: BuildField): Cell[] {
	return Array.from({ length: size }, (_, row) =>
		Array.from({ length: size }, (_, col): Cell => {
			const id: CellId = `${row}-${col}`;
			const marker: CellMarker = mines.includes(id)
				? 9
				: getSurroundingMineCount({ id, limit: size, mines });
			const state: CellState = selectCellId === id ? "opened" : "closed";
			return { id, marker, state };
		}),
	).flat();
}

export { buildField };
