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
	const buttons = LEVELS;
	const isIdleStatus = useAppSelector(selectIsIdleStatus);

	const dispatch = useAppDispatch();

	return (
		<FormControl>
			<FormLabel id="level">Level</FormLabel>
			<RadioGroup aria-labelledby="level" name="level" value={currentLevelName}>
				{buttons.map((el) => {
					const [name] = Object.keys(el);
					return (
						<FormControlLabel
							control={<Radio />}
							disabled={!isIdleStatus}
							key={name}
							label={name}
							sx={{ textTransform: "capitalize" }}
							value={name}
							onChange={() => dispatch(switchLevel(el))}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
};

export { Level };
