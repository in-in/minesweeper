import React, { useEffect } from "react";

import { Wrapper } from "@/components/Wrapper";
import { pageLoad } from "@/store/mainSlice";
import { useAppDispatch } from "@/utils/hooks";

import st from "./index.module.scss";

const App = (): React.ReactNode => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const handleLoad = (): void => {
			dispatch(pageLoad());
		};
		window.addEventListener("load", handleLoad);
		return () => {
			window.removeEventListener("load", handleLoad);
		};
	});
	return (
		<div className={st.layout}>
			<Wrapper />
		</div>
	);
};

export { App };
