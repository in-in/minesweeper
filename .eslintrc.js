const commonRules = {
	"prettier/prettier": ["error"],
	"logical-assignment-operators": ["error", "always"],
	"no-invalid-this": "error",
};

const commonParserOptions = {
	ecmaVersion: "latest",
};

module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	parserOptions: commonParserOptions,
	extends: ["standard", "prettier"],
	plugins: ["prettier"],
	rules: commonRules,
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			files: "**/*.+(ts|tsx)",
			extends: [
				"standard-with-typescript",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@typescript-eslint/strict",
				"prettier",
			],
			rules: {
				...commonRules,
			},
			parserOptions: {
				...commonParserOptions,
				sourceType: "module",
				project: true,
				tsconfigRootDir: __dirname,
			},
		},
	],
};
