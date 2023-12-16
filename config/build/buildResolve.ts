import type { Configuration } from "webpack";

import type { BuildOptions } from "./buildTypes";

import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

function buildResolve({ paths }: BuildOptions): Configuration["resolve"] {
	return {
		plugins: [new TsconfigPathsPlugin()],
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@fonts": paths.fonts,
		},
	};
}

export { buildResolve };
