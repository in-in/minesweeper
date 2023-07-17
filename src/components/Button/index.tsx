import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

interface AppProps {
	modifier?: string[];
	inner: JSX.Element;
	variant: "primary" | "active";
}

const Button = ({ inner, variant, modifier }: AppProps): JSX.Element => {
	const btnClass = clsx(st.button, st[variant], modifier);
	return (
		<button type="button" className={btnClass}>
			{inner}
		</button>
	);
};

export { Button };
