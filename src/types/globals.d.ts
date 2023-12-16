declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "*.css" {
	const content: Record<string, string>;
	export default content;
}

declare module "@images/*" {
	const content: string;
	export default content;
}

declare module "*.svg" {
	import { type ReactElement, type SVGProps } from "react";
	const content: (props: SVGProps<SVGElement>) => ReactElement;
	export default content;
}
