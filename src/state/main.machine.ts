/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createMachine } from "xstate";

import {
	StateMain,
	StateLevel,
	StateFinish,
	type Level,
	type GlobalEvent,
} from "@customTypes/customTypes";

const mainMachine = createMachine(
	{
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			context: {
				currentLevel: {} as Level,
			},
			events: {} as GlobalEvent,
		},
		id: "main",
		context: {
			currentLevel: {
				easy: 10,
			},
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
			actionsToMedium: (context) => {
				context.currentLevel = { medium: 15 };
			},
			actionsToHard: (context) => {
				context.currentLevel = { hard: 25 };
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
