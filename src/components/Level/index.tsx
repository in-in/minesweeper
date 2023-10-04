import React from "react";

import { Button } from "@/components/Button";
import {
	selectCurrentLevelName,
	selectIsIdleStatus,
	switchLevel,
} from "@/store/mainSlice";
import { LEVELS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Level = (): React.ReactNode => {
	const currentLevelName = useAppSelector(selectCurrentLevelName);
	const buttons = LEVELS;
	const isIdleStatus = useAppSelector(selectIsIdleStatus);

	const dispatch = useAppDispatch();

	return (
		<div className={st.level}>
			<p className={st.title}>Level</p>
			<ul className={st.group}>
				{buttons.map((el) => {
					const [key] = Object.keys(el);
					return (
						<li key={key}>
							<Button
								disabled={!isIdleStatus}
								inner={key}
								modifier={[st.button ?? ""]}
								variant={currentLevelName === key ? "active" : "primary"}
								onClick={() => dispatch(switchLevel(el))}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Level };
