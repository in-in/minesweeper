import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";

import { switchLevel } from "@/store/mainSlice";
import { selectCurrentLevelName, selectIsIdleStatus } from "@/store/selectors";
import { LEVELS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Level = (): React.ReactNode => {
	const currentLevelName = useAppSelector(selectCurrentLevelName);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);

	const dispatch = useAppDispatch();

	return (
		<FormControl>
			<FormLabel id="level">Level</FormLabel>
			<RadioGroup aria-labelledby="level" name="level" value={currentLevelName}>
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
