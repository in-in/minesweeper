import React from "react";

import { type MinesAmount } from "@/customTypes/customTypes";

import {
	selectIsPlayStatus,
	selectminesAmount,
	updateMinesAmount,
} from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Range = (): React.ReactNode => {
	const minesAmount = useAppSelector(selectminesAmount);
	const isPlayStatus = useAppSelector(selectIsPlayStatus);
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
				onChange={(ev) => {
					const value = Number(ev.target.value) as MinesAmount;
					return dispatch(updateMinesAmount(value));
				}}
				className={st.select}
				disabled={isPlayStatus}
				id="mines"
				name="mines"
				value={minesAmount}
			>
				{createSelectOptions}
			</select>
		</div>
	);
};

export { Range };
