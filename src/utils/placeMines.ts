import { type Cell, type CellId, type MainState } from "@/customTypes/customTypes";

import { buildField } from "./buildField";

function getRandom(max: number): number {
	return Math.floor(Math.random() * (max - 1 + 1));
}

export function placeMines(state: MainState): Cell[] {
	const { ignoredCell, minesAmount, currentLevel } = state;
	const mines = new Set<CellId>();
	const size = Object.values(currentLevel)[0] as number;

	while (minesAmount !== mines.size) {
		const mineCell: CellId = `${getRandom(size)}-${getRandom(size)}`;
		if (ignoredCell !== mineCell) {
			mines.add(mineCell);
		}
	}

	return buildField(size, [...mines]);
}
