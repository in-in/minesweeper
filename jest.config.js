const config = {
	preset: "ts-jest",
	moduleNameMapper: {
		"@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|sass|scss)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "<rootDir>/tsconfig.test.json",
			},
		],
	},
	testEnvironment: "jsdom",
};

module.exports = config;
