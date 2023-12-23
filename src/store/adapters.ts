import { type Cell, type ScoreRecord } from "@/customTypes/customTypes";

import { createEntityAdapter } from "@reduxjs/toolkit";

export const fieldAdapter = createEntityAdapter<Cell>();
export const scoretableAdapter = createEntityAdapter<ScoreRecord>();

export const fieldAdapterSelectors = fieldAdapter.getSelectors();
export const scoretableAdapterSelectors = scoretableAdapter.getSelectors();
