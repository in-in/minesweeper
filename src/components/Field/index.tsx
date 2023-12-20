import { type CSSCustomProperties } from "@/customTypes/customTypes";

import { clsx } from "clsx";

import { Cell as FieldCell } from "@/components/Cell";
import { selectCurrentLevelSize, selectField } from "@/store/selectors";
import { useAppSelector } from "@/utils/hooks";

import st from "./index.module.scss";

const Field = ({ className }: { className?: string }): React.ReactNode => {
	const currentLevelSize = useAppSelector(selectCurrentLevelSize);
	const field = useAppSelector(selectField);
	const style: CSSCustomProperties = { "--size": currentLevelSize };

	return (
		<div className={clsx(st.field, className)} data-testid="field" style={style}>
			{field.map((cell) => (
				<FieldCell cell={cell} key={cell.id} />
			))}
		</div>
	);
};

export { Field };
