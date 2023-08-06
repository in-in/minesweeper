import { createMachine } from "xstate";

import {
	StateMain,
	StateLevel,
	StateFinish,
	type Level,
	type GlobalEvent,
	type minesAmount,
} from "@customTypes/customTypes";

const mainMachine = createMachine(
	{
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			context: {
				currentLevel: {} as Level,
				minesAmount: {} as minesAmount,
			},
			events: {} as GlobalEvent,
		},
		id: "main",
		context: {
			currentLevel: {
				easy: 10,
			},
			minesAmount: 10,
		},
		initial: StateMain.Idle,
		states: {
			[StateMain.Idle]: {
				type: "compound",
				initial: "easy",
				states: {
					[StateLevel.Easy]: {
						on: {
							TO_MEDIUM: {
								target: StateLevel.Medium,
								actions: ["actionsToMedium"],
							},
							TO_HARD: {
								target: StateLevel.Hard,
								actions: ["actionsToHard"],
							},
						},
					},
					[StateLevel.Medium]: {
						on: {
							TO_EASY: { target: StateLevel.Easy, actions: ["actionsToEasy"] },
							TO_HARD: { target: StateLevel.Hard, actions: ["actionsToHard"] },
						},
					},
					[StateLevel.Hard]: {
						on: {
							TO_EASY: { target: StateLevel.Easy, actions: ["actionsToEasy"] },
							TO_MEDIUM: {
								target: StateLevel.Medium,
								actions: ["actionsToMedium"],
							},
						},
					},
				},
				on: {
					TOGGLE: {
						target: StateMain.Play,
					},
					UPDATE_MINES_AMOUNT: {
						actions: ["updateMinesAmount"],
					},
				},
			},
			[StateMain.Play]: {
				on: {
					FINISH: {
						target: StateMain.Finish,
					},
					TOGGLE: {
						target: StateMain.Idle,
					},
				},
			},
			[StateMain.Finish]: {
				always: [
					{ target: StateFinish.Win, cond: "didPlayerWin" },
					{ target: StateFinish.Lose, cond: "didPlayerLose" },
				],
				on: {
					TOGGLE: {
						target: StateMain.Idle,
					},
				},
			},
			[StateFinish.Win]: { type: "final" },
			[StateFinish.Lose]: { type: "final" },
		},
	},
	{
		actions: {
			actionsToEasy: (context) => {
				console.log("actionsToEasy", context);
				context.currentLevel = { easy: 10 };
			},
			updateMinesAmount: (ctx, event) => {
				if (event.type === "UPDATE_MINES_AMOUNT") {
					ctx.minesAmount = event.value;
				}
			},
		},
		guards: {
			didPlayerWin: (context, event) => {
				console.log(context, event);
				return true;
			},
			didPlayerLose: (context, event) => {
				console.log(context, event);
				return true;
			},
		},
	},
);

export { mainMachine };
