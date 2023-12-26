import { Box } from "@mui/material";
import {
	DataGrid,
	type GridColDef,
	type GridValueFormatterParams,
} from "@mui/x-data-grid";

import { selectScoretable } from "@/store/selectors";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { useAppSelector } from "@/utils/hooks";

const formatedDate = new Intl.DateTimeFormat("en-US", {
	hour12: false,
	dateStyle: "short",
	timeStyle: "medium",
});

const columns: GridColDef[] = [
	{
		field: "level",
		headerName: "Level",
		flex: 25,
		align: "center",
		headerAlign: "center",
	},
	{
		field: "clockTime",
		headerName: "Time",
		flex: 25,
		align: "center",
		headerAlign: "center",
		type: "number",
		valueFormatter: (params: GridValueFormatterParams<number>) =>
			formatClockTime(params.value),
	},
	{
		field: "turnCounter",
		headerName: "Turns",
		flex: 25,
		align: "center",
		headerAlign: "center",
	},
	{
		field: "date",
		headerName: "Date",
		flex: 25,
		align: "center",
		headerAlign: "center",
		valueFormatter: (params: GridValueFormatterParams<number>) =>
			formatedDate.format(params.value),
	},
];

const Scoretable = (): React.ReactNode => {
	const scoretable = useAppSelector(selectScoretable);

	return (
		<Box sx={{ width: "100%" }}>
			<DataGrid
				autoHeight
				disableColumnMenu
				disableRowSelectionOnClick
				columns={columns}
				density="compact"
				paginationModel={{ page: 0, pageSize: 5 }}
				rows={scoretable}
			/>
		</Box>
	);
};

export { Scoretable };
