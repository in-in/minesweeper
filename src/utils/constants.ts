import { buildField } from "@/utils/helpers/buildField";

export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const FINISH_WIN_MESSAGE_TITLE = "Game Over - You Won!";
export const FINISH_WIN_MESSAGE_TEXT = "You found all mines in _slot1_ and _slot2_!";
export const FINISH_LOSS_MESSAGE_TITLE = "Game Over - You have lost this round";
export const FINISH_LOSS_MESSAGE_TEXT = "Better luck next time! Try it again";
export const INITIAL_STATE = {
	[SLICE_MAIN]: {
		clockTime: 0,
		currentLevel: LEVELS[0],
		currentSelectCellId: null,
		field: buildField({ length: 10 }),
		finishMessageText: " ",
		finishMessageTitle: " ",
		flagCount: 10,
		isLoad: false,
		minesCount: 10,
		openCellCount: 0,
		status: "idle",
	},
};
