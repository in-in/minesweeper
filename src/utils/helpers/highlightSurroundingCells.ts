import { type Cell } from "@/customTypes/customTypes";

type HighlightSurroundingCells = {
	highlight: boolean;
	surroundingCells: Cell[];
};

function highlightSurroundingCells({
	highlight,
	surroundingCells,
}: HighlightSurroundingCells): Cell[] {
	const currentCellState = highlight ? "closed" : "highlighted";
	return surroundingCells
		.filter((el) => el.state === currentCellState)
		.map((cell) => {
			return highlight
				? { ...cell, state: "highlighted" }
				: { ...cell, state: "closed" };
		});
}

export { highlightSurroundingCells };
