import { type GlobalState, type Level } from "@/customTypes/customTypes";

import { fieldAdapter } from "@/store/fieldAdapter";
import { buildField } from "@/utils/helpers/buildField";

export const LEVELS = [
	{ name: "easy", size: 10 },
	{ name: "medium", size: 15 },
	{ name: "hard", size: 25 },
] as const satisfies Level[];
export const INITIAL_LEVEL = LEVELS[0];
export const SLICE_MAIN = "main";
export const FINISH_WIN_MESSAGE_TITLE = "Game Over - You Won!";
export const FINISH_WIN_MESSAGE_TEXT = "You found all mines in _slot1_ and _slot2_!";
export const FINISH_LOSS_MESSAGE_TITLE = "Game Over - You have lost this round";
export const FINISH_LOSS_MESSAGE_TEXT = "Better luck next time! Try it again";
export const INITIAL_STATE: GlobalState = {
	[SLICE_MAIN]: {
		clockTime: 0,
		currentLevel: INITIAL_LEVEL,
		currentSelectCellId: null,
		field: fieldAdapter.setAll(
			fieldAdapter.getInitialState(),
			buildField({ size: INITIAL_LEVEL.size }),
		),
		finishMessageText: " ",
		finishMessageTitle: " ",
		flagCounter: 10,
		isLoad: false,
		minesCounter: 10,
		openCellCounter: 0,
		status: "idle",
		turnCounter: 0,
	},
};
