import { buildField } from "@/utils/buildField";

export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const FINISH_WIN_MESSAGE_TITLE = "Game Over - You Won!";
export const FINISH_WIN_MESSAGE_TEXT =
	"You found all mines in ## seconds and N moves!";
export const FINISH_LOSS_MESSAGE_TITLE = "Game Over - You have lost this round";
export const FINISH_LOSS_MESSAGE_TEXT = "Better luck next time! Try it again";
export const INITIAL_STATE = {
	[SLICE_MAIN]: {
		currentLevel: LEVELS[0],
		minesAmount: 10,
		status: "idle",
		ignoredCell: null,
		currentCell: null,
		openCellCount: 0,
		field: buildField(10),
		finishMessageTitle: " ",
		finishMessageText: " ",
	},
};
