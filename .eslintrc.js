const commonRules = {
	"prettier/prettier": ["error"],
	"logical-assignment-operators": ["error", "always"],
	"no-invalid-this": "error",
	"@typescript-eslint/consistent-type-assertions": "off",
	"perfectionist/sort-imports": [
		"error",
		{
			"type": "alphabetical",
			"read-tsconfig": true,
			"groups": [
				"side-effect",
				["builtin-type", "type", "builtin", "external"],
				["internal-type", "internal"],
				[
					"parent-type",
					"sibling-type",
					"index-type",
					"parent",
					"sibling",
					"index",
				],
				"style",
				"unknown",
			],
		},
	],
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
	extends: [
		"standard",
		"plugin:sonarjs/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier",
	],
	plugins: ["sonarjs", "perfectionist", "jsx-a11y", "prettier"],
	rules: commonRules,
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			files: "**/*.+(ts|tsx)",
			extends: [
				"standard-with-typescript",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:sonarjs/recommended",
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
