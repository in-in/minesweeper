import React from "react";

import { Cell } from "@/components/Cell";
import { type CSSCustomProperties } from "@/customTypes/customTypes";
import { start, selectField, selectCurrentLevelValue } from "@/store/mainSlice";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	return (
		<div className={st.field} style={style}>
			{field.map(({ id, flag }) => (
				<Cell key={id} flag={flag} onClick={() => dispatch(start(id))} />
			))}
		</div>
	);
};

export { Field };
