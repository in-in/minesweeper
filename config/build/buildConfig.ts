import type { Configuration } from "webpack";

import type { BuildOptions } from "./buildTypes";

import { buildDevServer } from "./buildDevServer";
import { buildModule } from "./buildModule";
import { buildOptimization } from "./buildOptimization";
import { buildPlugins } from "./buildPlugins";
import { buildResolve } from "./buildResolve";

function buildConfig(opts: BuildOptions): Configuration {
	const { mode, paths } = opts;
	const isDev = mode === "development";

	return {
		mode,
		entry: {
			app: {
				import: paths.entry,
			},
		},
		output: {
			filename: "[name].[contenthash].js",
			path: paths.output,
			clean: true,
		},
		plugins: buildPlugins(opts),
		module: buildModule(opts),
		resolve: buildResolve(opts),
		optimization: buildOptimization(opts),
		devtool: isDev && "eval-source-map",
		devServer: buildDevServer(opts),
		watchOptions: {
			ignored: /node_modules/,
		},
		stats: {
			modules: false,
		},
		performance: {
			hints: false,
		},
	};
}
export { buildConfig };
