import { clsx } from "clsx";
import React from "react";

import { type CellFlag } from "@/customTypes/customTypes";

import st from "./index.module.scss";

interface CellProps extends React.ComponentProps<"button"> {
	flag: CellFlag;
}

const Cell = ({ flag, ...rest }: CellProps): React.ReactNode => (
	<button
		// className={st.cell}
		className={clsx(st.cell, st.open)}
		data-cell={flag}
		{...rest}
	></button>
);

export { Cell };
