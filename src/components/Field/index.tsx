// import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

// interface AppProps {
// 	modifier?: string[];
// 	inner: JSX.Element;
// 	variant: "primary" | "active";
// }

const Field = (): JSX.Element => {
	// const btnClass = clsx(st.button, st[variant], modifier);
	return <div className={st.field}></div>;
};

export { Field };
