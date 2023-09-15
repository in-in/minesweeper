import React from "react";

import st from "./index.module.scss";

const Range = (): React.ReactNode => {
	const minesAmount = 10;

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
					console.log(event);
				}}
			>
				{createSelectOptions}
			</select>
		</div>
	);
};

export { Range };
