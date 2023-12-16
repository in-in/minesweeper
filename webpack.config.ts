import type { Configuration } from "webpack";

import type { BuildOptions, BuildPaths } from "./config/build/buildTypes";

import path from "node:path";

import { buildConfig } from "./config/build/buildConfig";

import "dotenv/config";

export default (env: BuildOptions): Configuration => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		html: path.resolve(__dirname, "src", "index.html"),
		output: path.resolve(__dirname, "dist"),
		icons: path.resolve(__dirname, "src", "assets", "icons"),
		fonts: path.resolve(__dirname, "src", "assets", "fonts"),
	};
	const config: Configuration = buildConfig({
		paths,
		port: process.env.PORT ?? 3030,
		mode: env.mode ?? "development",
		analyzer: env.analyzer,
		platform: env.platform ?? "desktop",
	});

	return config;
};
