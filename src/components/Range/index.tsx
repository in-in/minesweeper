import * as React from "react";

import { FormControl, FormLabel, NativeSelect } from "@mui/material";

import { type MinesCount } from "@/customTypes/customTypes";

import { updateMinesCount } from "@/store/mainSlice";
import { selectIsIdleStatus, selectMinesCount } from "@/store/selectors";
import { addTestId } from "@/utils/helpers/addTestId";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Range = (): React.ReactNode => {
	const minesCount = useAppSelector(selectMinesCount);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const dispatch = useAppDispatch();

	const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);

	const selectOptions = createRangeArray.map((el) => (
		<option key={el} value={el} {...addTestId("mines-select")}>
			{el}
		</option>
	));

	return (
		<FormControl fullWidth size="small">
			<FormLabel htmlFor="mines">Mines Amount</FormLabel>
			<NativeSelect
				disabled={!isIdleStatus}
				id="mines"
				name="mines"
				value={minesCount}
				onChange={(ev) =>
					dispatch(updateMinesCount(Number(ev.target.value) as MinesCount))
				}
			>
				{selectOptions}
			</NativeSelect>
		</FormControl>
	);
};

export { Range };
