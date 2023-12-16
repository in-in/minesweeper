import type { BuildOptions } from "./buildTypes";

import { join } from "node:path";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import EslingPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import { type Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

function buildPlugins({
	mode,
	paths,
	analyzer,
	platform,
}: BuildOptions): Configuration["plugins"] {
	const isDev = mode === "development";

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: join(paths.icons, "favicon.svg"),
		}),
		new MiniCssExtractPlugin({
			filename: "assets/[name].[contenthash].css",
		}),
		new DefinePlugin({
			APP_PLATFORM: JSON.stringify(platform),
			APP_MODE: JSON.stringify(mode),
		}),
	];

	if (isDev) {
		plugins.push(
			new ForkTsCheckerWebpackPlugin(),
			new ReactRefreshWebpackPlugin(),
			new EslingPlugin({
				extensions: [".tsx", ".ts", ".js"],
			}),
			new StylelintPlugin({
				files: "**/*.(scss)",
				fix: true,
			}),
		);
	}

	if (analyzer != null) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}

export { buildPlugins };
