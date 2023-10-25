function addTestId(id: string): Record<string, string> {
	if (process.env.NODE_ENV === "prod") return {};
	return {
		"data-testid": id,
	};
}

export { addTestId };
