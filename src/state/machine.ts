/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createMachine } from "xstate";

import {
	StateMain,
	StateLevel,
	type Level,
	type GlobalEvent,
} from "@customTypes/customTypes";

const machine = createMachine(
	{
		predictableActionArguments: true,
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
					START: {
						target: StateMain.Play,
					},
				},
			},
			[StateMain.Play]: {
				on: {
					WIN: {
						target: StateMain.Finish,
					},
				},
			},
			[StateMain.Finish]: {
				on: {
					RESTART: {
						target: StateMain.Idle,
					},
				},
			},
		},
	},
	{
		actions: {
			actionsToEasy: (context) => {
				context.currentLevel = { easy: 10 };
			},
			actionsToMedium: (context) => {
				context.currentLevel = { medium: 15 };
			},
			actionsToHard: (context) => {
				context.currentLevel = { hard: 25 };
			},
		},
	},
);

export { machine };
