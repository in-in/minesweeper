import React from "react";

import { clsx } from "clsx";

import st from "./index.module.scss";

type ButtonProps = {
	inner: React.ReactNode;
	variant: "primary" | "active";
	modifier?: string[];
} & React.ComponentProps<"button">;

const Button = ({
	inner,
	variant,
	modifier,
	...rest
}: ButtonProps): React.ReactNode => {
	const btnClass = clsx(st.button, st[variant], modifier);
	return (
		<button className={btnClass} type="button" {...rest}>
			{inner}
		</button>
	);
};

export { Button };
