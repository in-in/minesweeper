import { Box, Container } from "@mui/material";

import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { Scoretable } from "@/components/Scoretable";

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

const Wrapper = (): React.ReactNode => (
	<Container disableGutters maxWidth="lg" sx={styles}>
		<Box sx={{ gridArea: "dashboard" }}>
			<Dashboard />
		</Box>
		<Box sx={{ gridArea: "field" }}>
			<Field />
		</Box>
		<Box sx={{ gridArea: "scoretable" }}>
			<Scoretable />
		</Box>
		<Dialog />
	</Container>
);

export { Wrapper };
