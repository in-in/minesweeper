import { type Cell } from "@/customTypes/customTypes";

import { createEntityAdapter } from "@reduxjs/toolkit";

export const fieldAdapter = createEntityAdapter<Cell>();

export const fieldAdapterSelectors = fieldAdapter.getSelectors();
