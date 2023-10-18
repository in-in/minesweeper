import { clsx } from "clsx";
import React from "react";

import { type CellMarker, type CellState } from "@/customTypes/customTypes";

import st from "./index.module.scss";

type CellProps = {
	marker: CellMarker;
	state: CellState;
} & React.ComponentProps<"button">;

const Cell = ({ marker, state, ...rest }: CellProps): React.ReactNode => (
	<button
		data-cell={marker}
		className={clsx(
			st.cell,
			{ [st.open ?? ""]: state === "opened" },
			{ [st.flag ?? ""]: state === "flagged" },
		)}
		{...rest}
	></button>
);

export { Cell };
