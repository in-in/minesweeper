import {
	isJsxAttribute,
	type Node,
	type TransformationContext,
	type TransformerFactory,
	visitEachChild,
	visitNode,
	type Visitor,
} from "typescript";

function removeJsxAttributes<T extends Node>(
	attributes: string,
): TransformerFactory<T> {
	return (context: TransformationContext): ((node: T) => T) => {
		const visitor: Visitor = (node: Node): Node | undefined => {
			const regexp = new RegExp(attributes, "i");
			if (isJsxAttribute(node) && regexp.test(node.name.getText())) {
				return undefined;
			}
			return visitEachChild(node, visitor, context);
		};

		return (node: T): T => {
			const visitedNode = visitNode(node, visitor);
			return visitedNode !== undefined ? (visitedNode as T) : node;
		};
	};
}

export { removeJsxAttributes };
