import { createMachine } from "xstate";

enum State {
	"Idle" = "idle",
	"Play" = "play",
	"Finish" = "finish",
}

const machine = createMachine({
	predictableActionArguments: true,
	schema: {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		events: {} as { type: "START" } | { type: "WIN" } | { type: "RESTART" },
	},
	id: "main",
	initial: State.Idle,
	states: {
		[State.Idle]: {
			on: {
				START: {
					target: State.Play,
				},
			},
		},
		[State.Play]: {
			on: {
				WIN: {
					target: State.Finish,
				},
			},
		},
		[State.Finish]: {
			on: {
				RESTART: {
					target: State.Idle,
				},
			},
		},
	},
});

const { initialState } = machine;
console.log(initialState);

export { machine };
