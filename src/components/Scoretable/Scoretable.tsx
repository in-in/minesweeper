import st from "./index.module.scss";

const Scoretable = (): React.ReactNode => {
	return (
		<div className={st.scoretable}>
			<div className={st.row}>
				<div className={st.cell}>Score</div>
				<div className={st.cell}>Time</div>
				<div className={st.cell}>Date</div>
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
