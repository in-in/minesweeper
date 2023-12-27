import {
	Box,
	Button,
	Container,
	DialogActions,
	DialogContent,
	Dialog as MUIDialog,
} from "@mui/material";
import { Suspense } from "react";

import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { LazyScoretable as Scoretable } from "@/components/Scoretable/";
import { showScoretable } from "@/store/mainSlice";
import { SLICE_MAIN } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const styles = {
	display: "grid",
	gap: 2,
	padding: { xs: 1, sm: 2 },
	gridTemplateAreas: {
		xs: "'dashboard' 'field'",
		sm: `'field field field dashboard'`,
	},
	gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
};

const Wrapper = (): React.ReactNode => {
	const dispatch = useAppDispatch();
	const isScoretableDisplay = useAppSelector(
		(state) => state[SLICE_MAIN].isScoretableDisplay,
	);

	return (
		<Container disableGutters maxWidth="lg" sx={styles}>
			<Box sx={{ gridArea: "dashboard" }}>
				<Dashboard />
			</Box>
			<Box sx={{ gridArea: "field" }}>
				<Field />
			</Box>

			<MUIDialog
				fullWidth
				aria-labelledby="scoretable-dialog-title"
				maxWidth="md"
				open={isScoretableDisplay}
				onClose={() => dispatch(showScoretable())}
			>
				<DialogContent>
					<Suspense fallback={"Loading..."}>
						<Scoretable />
					</Suspense>
				</DialogContent>
				<DialogActions sx={{ p: "0 20px 8px" }}>
					<Button onClick={() => dispatch(showScoretable())}>Close</Button>
				</DialogActions>
			</MUIDialog>

			<Dialog />
		</Container>
	);
};

export { Wrapper };
