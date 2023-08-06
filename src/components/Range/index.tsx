import React from "react";

import { type minesAmount } from "@customTypes/customTypes";
import { mainMachineContext } from "@state/mainMachineContext";

import st from "./index.module.scss";

const Range = (): JSX.Element => {
	const [state, send] = mainMachineContext.useActor();
	const minesAmount = state.context.minesAmount;

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
				value={minesAmount}
				onChange={(event): void => {
					send({
						type: "UPDATE_MINES_AMOUNT",
						value: Number(event.target.value) as minesAmount,
					});
				}}
			>
				{createSelectOptions}
			</select>
		</div>
	);
};

export { Range };
