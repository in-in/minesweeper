import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

interface AppProps {
	modifier?: string[];
	inner: JSX.Element | string;
	variant: "primary" | "active";
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
	inner,
	variant,
	modifier,
	onClick,
	...rest
}: AppProps): JSX.Element => {
	const btnClass = clsx(st.button, st[variant], modifier);
	return (
		<button onClick={onClick} type="button" className={btnClass} {...rest}>
			{inner}
		</button>
	);
};

export { Button };
