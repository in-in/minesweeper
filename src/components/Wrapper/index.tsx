import {
	Box,
	Button,
	CircularProgress,
	Container,
	DialogActions,
	DialogContent,
	Dialog as MUIDialog,
} from "@mui/material";
import { Suspense } from "react";

import click from "@/assets/sounds/click.mp3";
import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { LazyScoretable as Scoretable } from "@/components/Scoretable/";
import { showScoretable } from "@/store/mainSlice";
import { SLICE_MAIN } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSound } from "@/utils/hooks/useSound";

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
	const playClick = useSound(click);
	const isScoretableDisplay = useAppSelector(
		(state) => state[SLICE_MAIN].isScoretableDisplay,
	);

	const handleClick = (): void => {
		dispatch(showScoretable());
		playClick();
	};

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
				aria-labelledby="scoretable-dialog"
				data-testid="scoretableDialog"
				maxWidth="md"
				open={isScoretableDisplay}
				onClose={() => dispatch(showScoretable())}
			>
				<DialogContent
					sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
				>
					<Suspense fallback={<CircularProgress data-testid="scoretableProgress" />}>
						<Scoretable />
					</Suspense>
				</DialogContent>
				<DialogActions sx={{ p: "0 20px 8px" }}>
					<Button onClick={handleClick}>Close</Button>
				</DialogActions>
			</MUIDialog>

			<Dialog />
		</Container>
	);
};

export { Wrapper };
