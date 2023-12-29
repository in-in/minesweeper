import {
	DataGrid,
	type GridColDef,
	type GridValueFormatterParams,
} from "@mui/x-data-grid";

import { selectScoretable } from "@/store/selectors";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { useAppSelector } from "@/utils/hooks/store";

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
	const scoretable = useAppSelector(selectScoretable);

	return (
		<DataGrid
			autoHeight
			disableColumnMenu
			disableRowSelectionOnClick
			columns={columns}
			data-testid="scoretableGrid"
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
	);
};

export { Scoretable };
