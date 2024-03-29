import type { PayloadAction } from "@reduxjs/toolkit";

import type {
	Cell,
	CellId,
	CellState,
	Levels,
	MinesCounter,
	ScoreRecord,
	StatusFinish,
} from "@/customTypes/customTypes";

import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";

import {
	fieldAdapter,
	fieldAdapterSelectors,
	scoretableAdapter,
	scoretableAdapterSelectors,
} from "@/store/adapters";
import {
	FINISH_LOSS_MESSAGE_TEXT,
	FINISH_LOSS_MESSAGE_TITLE,
	FINISH_WIN_MESSAGE_TEXT,
	FINISH_WIN_MESSAGE_TITLE,
	INITIAL_STATE,
	SLICE_MAIN,
} from "@/utils/constants";
import { buildField } from "@/utils/helpers/buildField";

export const revealSurroundingCells = createAction<{
	id: CellId;
	highlight: boolean;
}>(`${SLICE_MAIN}/revealSurroundingCells`);

const mainSlice = createSlice({
	name: SLICE_MAIN,
	initialState: INITIAL_STATE[SLICE_MAIN],
	reducers: {
		switchLevel(state, action: PayloadAction<Levels>) {
			state.currentLevel = action.payload;
			fieldAdapter.setAll(
				state.field,
				buildField({
					size: action.payload.size,
				}),
			);
		},
		switchTheme(state) {
			state.theme = state.theme === "dark" ? "light" : "dark";
		},
		toggleSound(state) {
			state.isSoundEnabled = !state.isSoundEnabled;
		},
		updateMinesCounter(state, action: PayloadAction<MinesCounter>) {
			state.minesCounter = action.payload;
			state.flagCounter = action.payload;
		},
		restart(state) {
			state.status = "idle";
			state.currentSelectCellId = null;
			state.openCellCounter = 0;
			state.turnCounter = 0;
			state.clockTime = 0;
			state.flagCounter = state.minesCounter;
			fieldAdapter.setAll(
				state.field,
				buildField({
					size: state.currentLevel.size,
				}),
			);
		},
		updateField(state, action: PayloadAction<Cell[]>) {
			fieldAdapter.setAll(state.field, action.payload);
			state.flagCounter = state.minesCounter;
		},
		openCell(state, action: PayloadAction<Cell>) {
			state.currentSelectCellId = action.payload.id;
			fieldAdapter.updateOne(state.field, {
				id: action.payload.id,
				changes: { state: "opened" },
			});
			state.turnCounter = state.turnCounter += 1;
			state.openCellCounter = state.openCellCounter += 1;
		},
		openSurroundingCells(state, action: PayloadAction<Cell[]>) {
			const updateObjects = action.payload.map((el) => ({
				id: el.id,
				changes: { state: "opened" as CellState },
			}));

			fieldAdapter.updateMany(state.field, updateObjects);

			state.openCellCounter = fieldAdapterSelectors
				.selectAll(state.field)
				.filter((el) => el.state === "opened").length;
		},
		highlightCells(state, action: PayloadAction<Cell[]>) {
			fieldAdapter.setMany(state.field, action.payload);
		},
		toggleCellFlag(state, action: PayloadAction<CellId>) {
			const targetCellState = state.field.entities[action.payload]?.state;
			if (targetCellState === "closed" || targetCellState === "flagged") {
				const newState = targetCellState === "closed" ? "flagged" : "closed";
				fieldAdapter.updateOne(state.field, {
					id: action.payload,
					changes: { state: newState },
				});
				state.flagCounter += newState === "flagged" ? -1 : 1;
			}
		},
		start(state) {
			state.status = "play";
		},
		play: {
			reducer(state, action?: PayloadAction<Pick<ScoreRecord, "id" | "date">>) {
				if (state.currentSelectCellId != null) {
					const currentSelectCellMarker =
						state.field.entities[state.currentSelectCellId];

					if (currentSelectCellMarker?.marker === 9) {
						state.status = "lose";
						state.finishMessageTitle = FINISH_LOSS_MESSAGE_TITLE;
						state.finishMessageText = FINISH_LOSS_MESSAGE_TEXT;
					} else if (
						state.openCellCounter >=
						state.field.ids.length - state.minesCounter
					) {
						state.status = "win";
						state.finishMessageTitle = FINISH_WIN_MESSAGE_TITLE;
						state.finishMessageText = FINISH_WIN_MESSAGE_TEXT;

						if (action != null) {
							const scoretablesIds = scoretableAdapterSelectors.selectIds(
								state.scoretable,
							);

							if (scoretablesIds.length >= 15 && scoretablesIds[0] != null) {
								scoretableAdapter.removeOne(state.scoretable, scoretablesIds[0]);
							}

							scoretableAdapter.setOne(state.scoretable, {
								clockTime: state.clockTime,
								date: action.payload.date,
								id: action.payload.id,
								level: state.currentLevel.name,
								turnCounter: state.turnCounter,
							});
						}
					}
				}
			},
			prepare() {
				const id = nanoid();
				const date = new Date().getTime();
				return { payload: { id, date } };
			},
		},
		displayHiddenMines(state, action: PayloadAction<StatusFinish>) {
			const stateStatus: CellState = action.payload === "win" ? "flagged" : "opened";
			const updateObjects = fieldAdapterSelectors
				.selectAll(state.field)
				.filter((cell) => cell.marker === 9)
				.map((el) => ({
					id: el.id,
					changes: { state: stateStatus },
				}));

			fieldAdapter.updateMany(state.field, updateObjects);
		},
		clockTick: (state) => {
			state.clockTime += 1;
		},
		pageLoad(state) {
			state.isLoad = !state.isLoad;
		},
		showScoretable(state) {
			state.isScoretableDisplay = !state.isScoretableDisplay;
		},
	},
});

export const {
	clockTick,
	displayHiddenMines,
	highlightCells,
	openCell,
	openSurroundingCells,
	pageLoad,
	play,
	restart,
	showScoretable,
	start,
	switchLevel,
	switchTheme,
	toggleCellFlag,
	toggleSound,
	updateField,
	updateMinesCounter,
} = mainSlice.actions;

export default mainSlice.reducer;
