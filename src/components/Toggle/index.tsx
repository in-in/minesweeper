import React from "react";

import st from "./index.module.scss";

interface AppProps {
	label: string;
}

const Toggle = ({ label }: AppProps): React.ReactNode => {
	const id = label.replace(/[^a-z0-9]/gi, "-");
	return (
		<div className={st.toggle}>
			<label className={st.title} htmlFor={`toggle-${id}`}>
				{label}
			</label>
			<input
				type="checkbox"
				className={st.input}
				name={`toggle-${id}`}
				id={`toggle-${id}`}
			/>
		</div>
	);
};

export { Toggle };
