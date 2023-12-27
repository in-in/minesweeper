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
		align: "center",
		field: "level",
		flex: 1,
		headerAlign: "center",
		minWidth: 100,
		renderHeader: () => <strong>Level</strong>,
	},
	{
		align: "center",
		field: "clockTime",
		flex: 1,
		headerAlign: "center",
		minWidth: 200,
		type: "number",
		renderHeader: () => <strong>Time</strong>,
		valueFormatter: (params: GridValueFormatterParams<number>) =>
			formatClockTime(params.value),
	},
	{
		align: "center",
		field: "turnCounter",
		flex: 1,
		headerAlign: "center",
		minWidth: 100,
		renderHeader: () => <strong>Turns</strong>,
	},
	{
		align: "center",
		field: "date",
		flex: 1,
		headerAlign: "center",
		minWidth: 200,
		renderHeader: () => <strong>Date</strong>,
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
