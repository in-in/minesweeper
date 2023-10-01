import React from "react";

import { type CSSCustomProperties } from "@/customTypes/customTypes";

import { Cell } from "@/components/Cell";
import {
	changeStatus,
	selectCurrentLevelValue,
	selectField,
	selectIsFinishStatus,
} from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const isFinishStatus = useAppSelector(selectIsFinishStatus);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	return (
		<div className={st.field} style={style}>
			{field.map(({ id, flag }) => (
				<Cell
					disabled={isFinishStatus}
					flag={flag}
					key={id}
					onClick={() => dispatch(changeStatus(id))}
				/>
			))}
		</div>
	);
};

export { Field };
