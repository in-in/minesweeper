import React from "react";

import { Button } from "@/components/Button";
import {
	selectCurrentLevelName,
	selectIsPlayStatus,
	switchLevel,
} from "@/store/mainSlice";
import { LEVELS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Level = (): React.ReactNode => {
	const currentLevelName = useAppSelector(selectCurrentLevelName);
	const buttons = LEVELS;
	const isPlayStatus = useAppSelector(selectIsPlayStatus);

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
								disabled={isPlayStatus}
								inner={key}
								modifier={[st.button ?? ""]}
								onClick={() => dispatch(switchLevel(el))}
								variant={currentLevelName === key ? "active" : "primary"}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Level };
