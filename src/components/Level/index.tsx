import React from "react";

import { Button } from "@components/Button";

import st from "./index.module.scss";

const Level = (): JSX.Element => {
	return (
		<div className={st.level}>
			<Button
				data-level={10}
				inner={<>Easy</>}
				variant="primary"
				modifier={[st.button ?? ""]}
			/>
			<Button
				data-level={15}
				inner={<>Medium</>}
				variant="primary"
				modifier={[st.button ?? ""]}
			/>
			<Button
				data-level={25}
				inner={<>Hard</>}
				variant="primary"
				modifier={[st.button ?? ""]}
			/>
		</div>
	);
};

export { Level };
