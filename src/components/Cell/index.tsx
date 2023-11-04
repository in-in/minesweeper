import { Flag, LocalFireDepartment } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
	amber,
	blue,
	cyan,
	green,
	lime,
	orange,
	red,
	teal,
	yellow,
} from "@mui/material/colors";
import { clsx } from "clsx";
import React from "react";

import { type CellMarker, type CellState } from "@/customTypes/customTypes";

import { addTestId } from "@/utils/helpers/addTestId";

import st from "./index.module.scss";

type CellProps = {
	marker: CellMarker;
	state: CellState;
} & React.ComponentProps<"button">;

const mapColor = {
	1: blue,
	2: cyan,
	3: teal,
	4: green,
	5: lime,
	6: yellow,
	7: amber,
	8: orange,
	9: red,
};

const cellStyle = {
	width: 1,
	height: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: "bold",
} as const;

const CellInner = ({ marker }: Pick<CellProps, "marker">): React.ReactNode => {
	if (marker === 9) {
		return (
			<Box
				sx={{
					...cellStyle,
					color: mapColor[marker][900],
					bgcolor: mapColor[marker].A100,
				}}
			>
				<LocalFireDepartment />
			</Box>
		);
	} else if (marker === 0) {
		return null;
	} else {
		return (
			<Box
				sx={{
					...cellStyle,
					color: mapColor[marker][900],
					bgcolor: mapColor[marker].A100,
				}}
			>
				{marker}
			</Box>
		);
	}
};

const Cell = ({ marker, state, ...rest }: CellProps): React.ReactNode => (
	<button
		className={clsx(st.cell, { [st.open ?? ""]: state === "opened" })}
		{...addTestId(String(marker))}
		{...rest}
	>
		{state === "opened" && <CellInner marker={marker} />}
		{state === "flagged" && <Flag sx={{ color: green.A400 }} />}
	</button>
);

export { Cell };
