const commonRules = {
	"@typescript-eslint/consistent-type-assertions": "off",
	"logical-assignment-operators": ["error", "always"],
	"no-await-in-loop": "error",
	"no-invalid-this": "error",
	"no-promise-executor-return": "error",
	"no-return-await": "error",
	"prettier/prettier": ["error"],
	"require-atomic-updates": "error",
	"perfectionist/sort-imports": [
		"error",
		{
			"type": "alphabetical",
			"ignore-case": true,
			"custom-groups": {
				value: {
					customTypes: ["customTypes", "@/customTypes/**"],
				},
				type: {
					customTypes: ["customTypes", "@/customTypes/**"],
				},
			},
			"groups": [
				"side-effect",
				["builtin-type", "type", "builtin", "external"],
				"customTypes",
				["internal-type", "internal"],
				["parent-type", "sibling-type", "index-type", "parent", "sibling", "index"],
				"style",
				"unknown",
			],
			"internal-pattern": ["@/**"],
		},
	],
	"perfectionist/sort-named-imports": [
		"error",
		{
			"ignore-case": true,
		},
	],
	"perfectionist/sort-named-exports": [
		"error",
		{
			"ignore-case": true,
		},
	],
	"perfectionist/sort-jsx-props": [
		"error",
		{
			groups: ["shorthand", "multiline", "unknown"],
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
