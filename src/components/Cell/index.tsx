import React from "react";

import st from "./index.module.scss";

interface CellProps {
	cellRowId: number;
	cellColId: number;
}

const Cell = ({ cellRowId, cellColId }: CellProps): React.ReactNode => (
	<button
		className={st.cell}
		data-cellrowid={cellRowId}
		data-cellcolid={cellColId}
	></button>
);

export { Cell };
