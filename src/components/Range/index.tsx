import React from "react";

import { type MinesAmount } from "@/customTypes/customTypes";
import { selectIsPlayStatus } from "@/store/gameSlice";
import { updateMinesAmount, selectminesAmount } from "@/store/mainSlice";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";

import st from "./index.module.scss";

const Range = (): React.ReactNode => {
	const minesAmount = useAppSelector(selectminesAmount);
	const isPlayStatus = useAppSelector(selectIsPlayStatus);
	const dispatch = useAppDispatch();
	const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);

	const createSelectOptions = createRangeArray.map((el) => (
		<option key={el} className={st.option} value={el}>
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
				name="mines"
				id="mines"
				disabled={isPlayStatus}
				value={minesAmount}
				onChange={(ev) => {
					const value = Number(ev.target.value) as MinesAmount;
					return dispatch(updateMinesAmount(value));
				}}
			>
				{createSelectOptions}
			</select>
		</div>
	);
};

export { Range };
