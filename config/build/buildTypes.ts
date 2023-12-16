import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export interface BuildPaths {
	entry: string;
	html: string;
	output: string;
	icons: string;
	fonts: string;
}

export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
	paths: BuildPaths;
	mode?: Configuration["mode"];
	port?: DevServerConfiguration["port"];
	analyzer?: string;
	platform?: BuildPlatform;
}
