import React from "react";

import st from "./index.module.scss";

interface AppProps {
	label: string;
	counter?: number;
}

const Stat = ({ label, counter = 0 }: AppProps): JSX.Element => {
	const id = label.replace(/[^a-z0-9]/gi, "-");
	return (
		<div className={st.stat} id={`stat-${id}`}>
			<span className={st.label}>{label}</span>
			<span className={st.counter}>{counter}</span>
		</div>
	);
};

export { Stat };
