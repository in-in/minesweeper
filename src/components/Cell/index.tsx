import { clsx } from "clsx";
import React from "react";

import { type CellMarker } from "@/customTypes/customTypes";

import st from "./index.module.scss";

interface CellProps extends React.ComponentProps<"button"> {
	marker: CellMarker;
}

const Cell = ({ marker, ...rest }: CellProps): React.ReactNode => (
	<button
		// className={st.cell}
		className={clsx(st.cell, st.open)}
		data-cell={marker}
		{...rest}
	></button>
);

export { Cell };
