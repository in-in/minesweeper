import { type Cell, type CellId, type MainState } from "@/customTypes/customTypes";

import { buildField } from "@/utils/helpers/buildField";

function getRandom(max: number): number {
	return Math.floor(Math.random() * (max - 1 + 1));
}

function placeMines(state: MainState): Cell[] {
	const { currentSelectCell, minesCount, currentLevel } = state;
	const mines = new Set<CellId>();
	const size = Object.values(currentLevel)[0] as number;

	while (minesCount !== mines.size) {
		const mineCell: CellId = `${getRandom(size)}-${getRandom(size)}`;
		if (currentSelectCell !== mineCell) {
			mines.add(mineCell);
		}
	}

	return buildField({
		length: size,
		mines: [...mines],
		selectCell: currentSelectCell,
	});
}

export { placeMines };
