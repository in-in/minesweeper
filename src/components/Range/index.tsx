import React from "react";

import { type MinesAmount } from "@/customTypes/customTypes";

import { updateMinesAmount } from "@/store/mainSlice";
import { selectIsIdleStatus, selectMinesAmount } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Range = (): React.ReactNode => {
	const minesAmount = useAppSelector(selectMinesAmount);
	const isIdleStatus = useAppSelector(selectIsIdleStatus);
	const dispatch = useAppDispatch();
	const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);

	const createSelectOptions = createRangeArray.map((el) => (
		<option className={st.option} key={el} value={el}>
			{el}
		</option>
	));

	return (
		<div className={st.range}>
			<label className={st.title} htmlFor="mines">
				mines <br /> amount
			</label>
			<select
				className={st.select}
				disabled={!isIdleStatus}
				id="mines"
				name="mines"
				value={minesAmount}
				onChange={(ev) =>
					dispatch(updateMinesAmount(Number(ev.target.value) as MinesAmount))
				}
			>
				{createSelectOptions}
			</select>
		</div>
	);
};

export { Range };
