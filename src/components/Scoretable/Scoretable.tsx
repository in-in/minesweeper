import { selectScoretable } from "@/store/selectors";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const formatedDate = new Intl.DateTimeFormat("en-US", {
	hour12: false,
	dateStyle: "short",
	timeStyle: "medium",
});

const Scoretable = (): React.ReactNode => {
	const scoretable = useAppSelector(selectScoretable);

	return (
		<div className={st.scoretable}>
			<div className={st.row}>
				<div className={st.cell}>Level</div>
				<div className={st.cell}>clockTime</div>
				<div className={st.cell}>turnCounter</div>
				<div className={st.cell}>Date</div>
			</div>
			{scoretable.map((record) => (
				<div className={st.row} key={record.id}>
					<div className={st.cell}>{record.level}</div>
					<div className={st.cell}>{formatClockTime(record.clockTime)}</div>
					<div className={st.cell}>{record.turnCounter}</div>
					<div className={st.cell}>{formatedDate.format(record.date)}</div>
				</div>
			))}
		</div>
	);
};

export { Scoretable };
