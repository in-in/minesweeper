import { type CellMarker, type CellState } from "@/customTypes/customTypes";

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

import { selectStatus } from "@/store/selectors";
import { useAppSelector } from "@/utils/hooks";

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

const Cell = ({ marker, state, ...rest }: CellProps): React.ReactNode => {
	const status = useAppSelector(selectStatus);
	return (
		<button
			data-testid={marker}
			className={clsx(
				st.cell,
				{ [st.open ?? ""]: state === "opened" },
				{ [st.highlight ?? ""]: state === "highlighted" },
			)}
			{...rest}
		>
			{state === "opened" && <CellInner marker={marker} />}
			{state === "flagged" && (
				<Flag sx={{ color: status === "lose" ? red.A400 : green.A400 }} />
			)}
		</button>
	);
};

export { Cell };
