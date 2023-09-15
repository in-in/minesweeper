import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

interface AppProps {
	modifier?: string[];
	inner: React.ReactNode;
	variant: "primary" | "active";
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
	inner,
	variant,
	modifier,
	onClick,
	...rest
}: AppProps): React.ReactNode => {
	const btnClass = clsx(st.button, st[variant], modifier);
	return (
		<button onClick={onClick} type="button" className={btnClass} {...rest}>
			{inner}
		</button>
	);
};

export { Button };
