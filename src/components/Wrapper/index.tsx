import { Box, Container } from "@mui/material";
import { Suspense } from "react";

import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { LazyScoretable as Scoretable } from "@/components/Scoretable/";
import { SLICE_MAIN } from "@/utils/constants";
import { useAppSelector } from "@/utils/hooks";

const styles = {
	display: "grid",
	gap: 2,
	padding: 2,
	gridTemplateAreas: {
		xs: "'dashboard' 'field' 'scoretable'",
		sm: `'field field field dashboard'
				 'scoretable scoretable scoretable scoretable'`,
	},
	gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
};

const Wrapper = (): React.ReactNode => {
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
			{isScoretableDisplay && (
				<Suspense fallback={"Loading..."}>
					<Box sx={{ gridArea: "scoretable" }}>
						<Scoretable />
					</Box>
				</Suspense>
			)}

			<Dialog />
		</Container>
	);
};

export { Wrapper };
