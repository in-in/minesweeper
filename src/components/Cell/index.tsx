import { clsx } from "clsx";
import React from "react";

import { type CellMarker, type CellState } from "@/customTypes/customTypes";

import st from "./index.module.scss";

interface CellProps extends React.ComponentProps<"button"> {
	marker: CellMarker;
	state: CellState;
}

const Cell = ({ marker, state, ...rest }: CellProps): React.ReactNode => (
	<button
		className={clsx(st.cell, { [st.open ?? ""]: state === "opened" })}
		data-cell={marker}
		{...rest}
	></button>
);

export { Cell };
