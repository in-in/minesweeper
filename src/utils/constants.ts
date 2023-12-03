import { type GlobalState } from "@/customTypes/customTypes";

import { fieldAdapter } from "@/store/fieldAdapter";
import { buildField } from "@/utils/helpers/buildField";

const field = fieldAdapter.upsertMany(
	fieldAdapter.getInitialState(),
	buildField({ length: 10 }),
);

export const LEVELS = [{ easy: 10 }, { medium: 15 }, { hard: 25 }] as const;
export const SLICE_MAIN = "main";
export const FINISH_WIN_MESSAGE_TITLE = "Game Over - You Won!";
export const FINISH_WIN_MESSAGE_TEXT = "You found all mines in _slot1_ and _slot2_!";
export const FINISH_LOSS_MESSAGE_TITLE = "Game Over - You have lost this round";
export const FINISH_LOSS_MESSAGE_TEXT = "Better luck next time! Try it again";
export const INITIAL_STATE: GlobalState = {
	[SLICE_MAIN]: {
		clockTime: 0,
		currentLevel: LEVELS[0],
		currentSelectCellId: null,
		field,
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
