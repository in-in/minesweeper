import React from "react";

import st from "./index.module.scss";

const createRangeArray = Array.from({ length: 90 }, (_, i) => i + 10);
const createSelectOptions = createRangeArray.map((el) => (
	<option className={st.option} value={el}>
		{el}
	</option>
));

const Range = (): JSX.Element => (
	<div className={st.range}>
		<label className={st.title} htmlFor="mines">
			mines <br /> amount
		</label>
		<select className={st.select} name="mines" id="mines">
			{createSelectOptions}
		</select>
	</div>
);

export { Range };
