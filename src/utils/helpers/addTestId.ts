function addTestId(id: string): Record<string, string> {
	return process.env.NODE_ENV === "prod" ? {} : { "data-testid": id };
}

export { addTestId };
