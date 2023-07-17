import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

const Scoretable = (): JSX.Element => {
	return (
		<div className={st.scoretable}>
			<div className={st.row}>
				<div className={clsx(st.cell, st.title)}>Score</div>
				<div className={clsx(st.cell, st.title)}>Time</div>
				<div className={clsx(st.cell, st.title)}>Date</div>
			</div>
			<div className={st.row}>
				<div className={st.cell}>123</div>
				<div className={st.cell}>1:23</div>
				<div className={st.cell}>15.05.23 12:04</div>
			</div>
			<div className={st.row}>
				<div className={st.cell}>123</div>
				<div className={st.cell}>1:23</div>
				<div className={st.cell}>15.05.23 12:04</div>
			</div>
			<div className={st.row}>
				<div className={st.cell}>123</div>
				<div className={st.cell}>1:23</div>
				<div className={st.cell}>15.05.23 12:04</div>
			</div>
		</div>
	);
};

export { Scoretable };
