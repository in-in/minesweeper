import { type MinesCounter } from "@/customTypes/customTypes";

import { FormControl, FormLabel, NativeSelect } from "@mui/material";

import { updateMinesCounter } from "@/store/mainSlice";
import { selectIsIdleStatus, selectMinesCounter } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Range = (): React.ReactNode => {
	const minesCounter = useAppSelector(selectMinesCounter);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const dispatch = useAppDispatch();

	const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);

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
				onChange={(ev) =>
					dispatch(updateMinesCounter(Number(ev.target.value) as MinesCounter))
				}
			>
				{selectOptions}
			</NativeSelect>
		</FormControl>
	);
};

export { Range };
