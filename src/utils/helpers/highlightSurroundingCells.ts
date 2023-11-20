import { type Cell } from "@/customTypes/customTypes";

type HighlightSurroundingCells = {
	field: Cell[];
	highlight: boolean;
	surroundingCells: Cell[];
};

function highlightSurroundingCells({
	field,
	highlight,
	surroundingCells,
}: HighlightSurroundingCells): Cell[] {
	const currentCellState = highlight ? "closed" : "highlighted";
	const highlightedSurroundingCells = surroundingCells
		.filter((el) => el.state === currentCellState)
		.map((cell) => {
			return highlight
				? { ...cell, state: "highlighted" }
				: { ...cell, state: "closed" };
		});
	return field.map((cell) =>
		highlightedSurroundingCells.map((el) => el.id).includes(cell.id)
			? (highlightedSurroundingCells.find((el) => el.id === cell.id) as Cell)
			: cell,
	);
}

export { highlightSurroundingCells };
