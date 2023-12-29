import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { switchLevel } from "@/store/mainSlice";
import { selectCurrentLevelName, selectIsIdleStatus } from "@/store/selectors";
import { LEVELS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";

const Level = (): React.ReactNode => {
	const currentLevelName = useAppSelector(selectCurrentLevelName);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<FormControl>
			<FormLabel id="level">Level</FormLabel>
			<RadioGroup
				aria-labelledby="level"
				name="level"
				row={matches}
				value={currentLevelName}
			>
				{LEVELS.map((level) => {
					return (
						<FormControlLabel
							control={<Radio />}
							disabled={!isIdleStatus}
							key={level.name}
							label={level.name}
							sx={{ textTransform: "capitalize" }}
							value={level.name}
							onChange={() => dispatch(switchLevel(level))}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
};

export { Level };
