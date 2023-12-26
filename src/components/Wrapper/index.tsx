import { Box, Container } from "@mui/material";
import { Suspense } from "react";

import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { LazyScoretable as Scoretable } from "@/components/Scoretable/";

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
	return (
		<Container disableGutters maxWidth="lg" sx={styles}>
			<Box sx={{ gridArea: "dashboard" }}>
				<Dashboard />
			</Box>
			<Box sx={{ gridArea: "field" }}>
				<Field />
			</Box>
			<Suspense fallback={"Loading..."}>
				<Scoretable />
			</Suspense>

			<Dialog />
		</Container>
	);
};

export { Wrapper };
