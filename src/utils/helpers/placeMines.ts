import { type Cell, type CellId, type MainState } from "@/customTypes/customTypes";

import { buildField } from "@/utils/helpers/buildField";

function getRandom(max: number): number {
	return Math.floor(Math.random() * (max - 1 + 1));
}

function placeMines(state: MainState): Cell[] {
	const { currentSelectCellId, minesCounter, currentLevel } = state;
	const mines = new Set<CellId>();
	const size = currentLevel.size;

	while (minesCounter !== mines.size) {
		const mineCell: CellId = `${getRandom(size)}-${getRandom(size)}`;
		if (currentSelectCellId !== mineCell) {
			mines.add(mineCell);
		}
	}

	return buildField({
		size,
		mines: [...mines],
		selectCellId: currentSelectCellId,
	});
}

export { placeMines };
