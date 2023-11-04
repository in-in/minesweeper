const commonRules = {
	"@typescript-eslint/consistent-type-assertions": "off",
	"@typescript-eslint/consistent-type-definitions": ["error", "type"],
	"jsx-a11y/no-autofocus": "off",
	"logical-assignment-operators": ["error", "always"],
	"max-params": ["error", 3],
	"no-await-in-loop": "error",
	"no-dupe-args": "error",
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
			"ignore-case": true,
			"custom-groups": {
				callback: "on*",
			},
			"groups": ["shorthand", "unknown", "callback", "multiline"],
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
	settings: {
		react: {
			version: "detect",
		},
	},
	extends: [
		"standard",
		"plugin:react/recommended",
		"plugin:sonarjs/recommended",
		"plugin:jsx-a11y/strict",
		"plugin:react-hooks/recommended",
		"prettier",
	],
	plugins: ["sonarjs", "perfectionist", "prettier"],
	rules: commonRules,
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			files: "**/*.+(ts|tsx)",
			extends: [
				"standard-with-typescript",
				"plugin:sonarjs/recommended",
				"plugin:@typescript-eslint/strict-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked",
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
		{
			files: ["*.{test,cy}.{ts,tsx}"],
			plugins: ["cypress"],
			extends: ["plugin:cypress/recommended"],
			rules: {
				"sonarjs/no-duplicate-string": "off",
			},
		},
	],
};
