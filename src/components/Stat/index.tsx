import React from "react";

import st from "./index.module.scss";

type StatProps = {
	label: string;
	counter?: string;
};

const Stat = ({ label, counter = "0" }: StatProps): React.ReactNode => {
	const id = label.replace(/[^a-z0-9]/gi, "-");
	return (
		<div className={st.stat} id={`stat-${id}`}>
			<span className={st.label}>{label}</span>
			<span className={st.counter}>{counter}</span>
		</div>
	);
};

export { Stat };
