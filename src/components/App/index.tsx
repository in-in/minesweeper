import React from "react";

import src1 from "@images/nathan.jpg";
import src2 from "@images/stanos.jpg";
import trainUrl from "@images/train.svg?url";
import Bomb from "@svg/bomb.svg";

import st from "./index.module.scss";

const App = (): JSX.Element => (
	<div className={st.layout}>
		<p className={st.title}>App</p>
		<img src={src1} alt="" className={st.img} />
		<img src={src2} alt="" className={st.img} />
		<img src={trainUrl} alt="" className={st.img} />
		<div className={st.back}></div>
		<div className={st.back1}></div>
		<div className={st.back2}></div>
		<Bomb className={st.icon} />
	</div>
);

export { App };
