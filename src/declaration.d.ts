declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "@assets/images/*" {
	const content: string;
	export default content;
}
