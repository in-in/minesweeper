import "webpack-dev-server";

import EslingPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { join } from "node:path";
import StylelintPlugin from "stylelint-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack, { type Configuration } from "webpack";

import { PATHS } from "./paths";

const isDev = process.env.NODE_ENV !== "prod";

const assetFilename = "[path][name].[contenthash][ext]";
const assetModuleType = "asset/resource";

const ts = {
	test: /\.([cm]?ts|tsx)$/i,
	use: [
		{
			loader: "ts-loader",
			options: {
				compilerOptions: {
					noPropertyAccessFromIndexSignature: false,
				},
			},
		},
	],
};

const styles = {
	test: /\.(sc|c)ss$/i,
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
				modules: {
					localIdentName: isDev
						? "[folder]__[local]_[hash:base64:5]"
						: "[hash:base64]",
				},
			},
		},
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					config: PATHS.config,
				},
			},
		},
		{
			loader: "sass-loader",
			options: {
				sassOptions: {
					includePaths: [PATHS.styles],
				},
			},
		},
	],
};

const images = {
	test: /\.(png|webp|jpe?g)$/i,
	type: assetModuleType,
	generator: {
		filename: assetFilename,
	},
};

const svg = {
	test: /\.svg$/i,
	oneOf: [
		{
			resourceQuery: /url/,
			type: assetModuleType,
		},
		{
			resourceQuery: { not: [/url/] },
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						typescript: true,
					},
				},
			],
		},
	],
	generator: {
		filename: assetFilename,
	},
};

const fonts = {
	test: /\.woff2$/i,
	type: assetModuleType,
	generator: {
		filename: assetFilename,
	},
};

const config: Configuration = {
	mode: isDev ? "development" : "production",
	entry: {
		app: {
			import: join(PATHS.src, "index.tsx"),
			dependOn: "vendor",
		},
		vendor: ["react", "react-dom"],
	},
	output: {
		filename: "assets/[name].[contenthash].js",
		path: PATHS.dist,
		clean: true,
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
		alias: {
			"@fonts": PATHS.fonts,
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: join(PATHS.src, "index.html"),
			filename: "index.html",
			favicon: join(PATHS.images, "favicon.svg"),
		}),
		new MiniCssExtractPlugin({
			filename: "assets/[name].[contenthash].css",
		}),
		new StylelintPlugin({
			files: "**/*.(scss)",
			fix: true,
		}),
		new EslingPlugin({
			extensions: ["ts"],
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("prod"),
		}),
	],
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.sharpMinify,
					options: {
						encodeOptions: {
							jpeg: {
								quality: 80,
								progressive: true,
							},
							png: {
								compressionLevel: 7,
								progressive: true,
								quality: 80,
							},
							webp: {
								quality: 70,
								alphaQuality: 80,
								effort: 6,
							},
						},
					},
				},
			}),
		],
	},
	devtool: isDev ? "eval-cheap-source-map" : false,
	devServer: {
		host: "0.0.0.0",
		hot: true,
		port: 7777,
		client: {
			logging: "error",
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		static: {
			directory: PATHS.dist,
		},
		watchFiles: {
			paths: ["src/**/*.*"],
			options: {
				usePolling: true,
			},
		},
		devMiddleware: {
			stats: false,
		},
	},
	module: {
		rules: [ts, styles, images, svg, fonts],
	},
};

module.exports = config;
