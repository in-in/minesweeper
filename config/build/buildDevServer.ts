import type { Configuration } from "webpack-dev-server";

import type { BuildOptions } from "./buildTypes";

function buildDevServer({ port }: BuildOptions): Configuration {
	return {
		port,
		historyApiFallback: true,
		client: {
			logging: "warn",
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	};
}

export { buildDevServer };
