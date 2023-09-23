import React from "react";

import { Button } from "@/components/Button";
import { selectIsPlayStatus } from "@/store/gameSlice";
import { selectCurrentLevelName, switchLevel } from "@/store/mainSlice";
import * as constants from "@/utils/constants";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";

import st from "./index.module.scss";

const Level = (): React.ReactNode => {
	const currentLevelName = useAppSelector(selectCurrentLevelName);
	const buttons = constants.LEVELS;
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
								inner={key}
								disabled={isPlayStatus}
								variant={currentLevelName === key ? "active" : "primary"}
								onClick={() => dispatch(switchLevel(el))}
								modifier={[st.button ?? ""]}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { Level };
