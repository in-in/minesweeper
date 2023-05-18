module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: [
				'.**/webpack.*.js',
			],
			optionalDependencies: false,
		}],
	},
};
