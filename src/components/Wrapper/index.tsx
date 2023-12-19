import { Dashboard } from "@/components/Dashboard";
import { Dialog } from "@/components/Dialog";
import { Field } from "@/components/Field";
import { Scoretable } from "@/components/Scoretable";

import st from "./index.module.scss";

const Wrapper = (): React.ReactNode => (
	<div className={st.wrapper}>
		<Dashboard />
		<Field />
		<Scoretable />
		<Dialog />
	</div>
);

export { Wrapper };
