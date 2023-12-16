const commonRules = {
	"@typescript-eslint/consistent-type-assertions": "off",
	"jsx-a11y/no-autofocus": "off",
	"logical-assignment-operators": ["error", "always"],
	"max-params": ["error", 3],
	"no-await-in-loop": "error",
	"no-dupe-args": "error",
	"no-invalid-this": "error",
	"no-promise-executor-return": "error",
	"prettier/prettier": ["error"],
	"require-atomic-updates": "error",
	"sonarjs/no-duplicate-string": [
		"error",
		{ ignoreStrings: "background: #111; font-size: 17px;" },
	],
	"perfectionist/sort-imports": [
		"error",
		{
			"type": "alphabetical",
			"ignore-case": true,
			"internal-pattern": ["@/**", "@root/**", "@images/**", "@icons/**"],
			"custom-groups": {
				value: {
					customTypes: ["@/customTypes/**"],
				},
			},
			"groups": [
				["builtin-type", "type"],
				"internal-type",
				["parent-type", "sibling-type", "index-type"],
				["customTypes"],
				"builtin",
				"external",
				"internal",
				["parent", "sibling", "index"],
				"side-effect",
				"object",
				"style",
				"unknown",
			],
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
		"plugin:react/jsx-runtime",
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
			files: ["*.{test,cy,spec}.{ts,tsx}"],
			plugins: ["cypress"],
			extends: ["plugin:cypress/recommended"],
			rules: {
				"sonarjs/no-duplicate-string": "off",
			},
		},
	],
};
