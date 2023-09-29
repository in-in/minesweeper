import React from "react";

import { type CSSCustomProperties } from "@/customTypes/customTypes";

import { Cell } from "@/components/Cell";
import { selectCurrentLevelValue, selectField, start } from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = (): React.ReactNode => {
	const currentLevelValue = useAppSelector(selectCurrentLevelValue);
	const field = useAppSelector(selectField);
	const dispatch = useAppDispatch();

	const style: CSSCustomProperties = { "--size": currentLevelValue };

	return (
		<div className={st.field} style={style}>
			{field.map(({ id, flag }) => (
				<Cell flag={flag} key={id} onClick={() => dispatch(start(id))} />
			))}
		</div>
	);
};

export { Field };
