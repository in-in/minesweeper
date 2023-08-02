import React from "react";

import st from "./index.module.scss";

interface CellProps {
	cellRowId: number;
	cellColId: number;
}

const Cell = ({ cellRowId, cellColId }: CellProps): JSX.Element => (
	<div
		className={st.cell}
		data-cellrowid={cellRowId}
		data-cellcolid={cellColId}
	></div>
);

export { Cell };
