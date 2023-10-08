import React from "react";

import st from "./index.module.scss";

type ToggleProps = {
	label: string;
};

const Toggle = ({ label }: ToggleProps): React.ReactNode => {
	const id = label.replace(/[^a-z0-9]/gi, "-");
	return (
		<div className={st.toggle}>
			<label className={st.title} htmlFor={`toggle-${id}`}>
				{label}
			</label>
			<input
				className={st.input}
				id={`toggle-${id}`}
				name={`toggle-${id}`}
				type="checkbox"
			/>
		</div>
	);
};

export { Toggle };
