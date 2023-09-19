import { clsx } from "clsx";
import React from "react";

import st from "./index.module.scss";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	inner: React.ReactNode;
	variant: "primary" | "active";
	modifier?: string[];
}

const Button = ({
	inner,
	variant,
	modifier,
	...rest
}: ButtonProps): React.ReactNode => {
	const btnClass = clsx(st.button, st[variant], modifier);
	return (
		<button type="button" className={btnClass} {...rest}>
			{inner}
		</button>
	);
};

export { Button };
