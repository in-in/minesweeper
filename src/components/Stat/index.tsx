import { Stack, Typography } from "@mui/material";

import st from "./index.module.scss";

interface StatProps {
	label: string;
	counter?: string;
}

const Stat = ({ label, counter = "0", ...rest }: StatProps): React.ReactNode => {
	const id = label.replace(/[^a-z0-9]/gi, "-").toLowerCase();
	return (
		<Stack
			alignItems="center"
			className={st.stat}
			id={`stat-${id}`}
			justifyContent="center"
			spacing={0}
			{...rest}
		>
			<Typography component="span" variant="subtitle1">
				{label}
			</Typography>
			<Typography color="secondary" component="span" variant="h6">
				{counter}
			</Typography>
		</Stack>
	);
};

export { Stat };
