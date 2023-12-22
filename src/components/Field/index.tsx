import { Box, type SxProps } from "@mui/material";

import { Cell as FieldCell } from "@/components/Cell";
import { selectCurrentLevelSize, selectField } from "@/store/selectors";
import { useAppSelector } from "@/utils/hooks";

const Field = (): React.ReactNode => {
	const currentLevelSize = useAppSelector(selectCurrentLevelSize);
	const field = useAppSelector(selectField);

	const styles: SxProps = {
		display: "grid",
		width: "100%",
		maxWidth: "100%",
		overflow: "hidden",
		aspectRatio: 1,
		fontSize: currentLevelSize === 10 ? 24 : 16,
		gridTemplateRows: `repeat(${currentLevelSize}, minmax(0, 1fr))`,
		gridTemplateColumns: `repeat(${currentLevelSize}, minmax(0, 1fr))`,
	};

	return (
		<Box data-testid="field" sx={styles}>
			{field.map((cell) => (
				<FieldCell cell={cell} key={cell.id} />
			))}
		</Box>
	);
};

export { Field };
