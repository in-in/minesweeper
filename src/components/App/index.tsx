import React from "react";
import st from "./index.module.scss";
import src1 from "@assets/images/nathan-watson-a4Goc6z9eQs-unsplash.jpg";
import src2 from "@assets/images/stanos-c7nhmXymV1Q-unsplash.jpg";

const App = (): JSX.Element => (
	<div className={st.layout}>
		<p className={st.title}>App</p>
		<img src={src1} alt="" className={st.img} />
		<img src={src2} alt="" className={st.img} />
		<div className={st.back}></div>
		<div className={st.back1}></div>
	</div>
);

export { App };
