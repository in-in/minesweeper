import { createEntityAdapter } from "@reduxjs/toolkit";

import { type Cell } from "@/customTypes/customTypes";

export const fieldAdapter = createEntityAdapter<Cell>();

export const fieldAdapterSelectors = fieldAdapter.getSelectors();
