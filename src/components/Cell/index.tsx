import React from "react";

import st from "./index.module.scss";

interface CellProps extends React.ComponentPropsWithoutRef<"button"> {
	cellRowId: number;
	cellColId: number;
}

const Cell = ({ cellRowId, cellColId, ...rest }: CellProps): React.ReactNode => (
	<button
		className={st.cell}
		data-cellrowid={cellRowId}
		data-cellcolid={cellColId}
		{...rest}
	></button>
);

export { Cell };
