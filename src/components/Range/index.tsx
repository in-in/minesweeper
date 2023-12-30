import { type MinesCounter } from "@/customTypes/customTypes";

import { FormControl, FormLabel, NativeSelect } from "@mui/material";

import dropdown from "@/assets/sounds/dropdown.mp3";
import { updateMinesCounter } from "@/store/mainSlice";
import { selectIsIdleStatus, selectMinesCounter } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSound } from "@/utils/hooks/useSound";

const Range = (): React.ReactNode => {
	const minesCounter = useAppSelector(selectMinesCounter);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const dispatch = useAppDispatch();

	const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);

	const play = useSound(dropdown);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		dispatch(updateMinesCounter(Number(event.target.value) as MinesCounter));
		play();
	};

	const selectOptions = createRangeArray.map((el) => (
		<option data-testid="mines-select" key={el} value={el}>
			{el}
		</option>
	));

	return (
		<FormControl size="small" sx={{ width: { xs: "100%", sm: "auto" } }}>
			<FormLabel htmlFor="mines">Mines Amount</FormLabel>
			<NativeSelect
				disabled={!isIdleStatus}
				id="mines"
				name="mines"
				value={minesCounter}
				onChange={handleChange}
			>
				{selectOptions}
			</NativeSelect>
		</FormControl>
	);
};

export { Range };
