import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import {
	DataGrid,
	type GridColDef,
	type GridValueFormatterParams,
} from "@mui/x-data-grid";

import { showScoretable } from "@/store/mainSlice";
import { selectScoretable } from "@/store/selectors";
import { SLICE_MAIN } from "@/utils/constants";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

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
	const dispatch = useAppDispatch();
	const scoretable = useAppSelector(selectScoretable);
	const isScoretableDisplay = useAppSelector(
		(state) => state[SLICE_MAIN].isScoretableDisplay,
	);

	return (
		<Dialog
			fullWidth
			aria-labelledby="scoretable-dialog-title"
			maxWidth="md"
			open={isScoretableDisplay}
			onClose={() => dispatch(showScoretable())}
		>
			<DialogContent>
				<DataGrid
					autoHeight
					disableColumnMenu
					disableRowSelectionOnClick
					columns={columns}
					density="compact"
					pageSizeOptions={[5]}
					rows={scoretable}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 5,
							},
						},
					}}
				/>
			</DialogContent>
			<DialogActions sx={{ p: "0 20px 8px" }}>
				<Button onClick={() => dispatch(showScoretable())}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export { Scoretable };
