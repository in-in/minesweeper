const { join } = require("node:path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const PugPlugin = require("pug-plugin");
const { PATHS } = require("./paths");

const isDev = process.env.NODE_ENV !== "prod";

const html = {
	test: /\.pug$/,
	loader: PugPlugin.loader,
	options: {
		data: {
			isDev,
		},
	},
};

const ts = {
	test: /\.ts$/i,
	use: "ts-loader",
};

const styles = {
	test: /\.scss$/,
	use: [
		"css-loader",
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
					indentType: "tab",
					indentWidth: 1,
					outputStyle: "expanded",
					includePaths: [PATHS.components, PATHS.styles],
				},
			},
		},
	],
};

const images = {
	test: /\.(png|webp|jpg|jpeg|svg)$/i,
	resourceQuery: { not: [/inline/] },
	type: "asset/resource",
	generator: {
		filename: "assets/images/[name].[contenthash:8][ext]",
	},
};

const inlineSvg = {
	test: /\.(svg)$/i,
	type: "asset/inline",
	resourceQuery: /inline/,
};

const fonts = {
	test: /\.(woff2|woff)$/i,
	type: "asset/resource",
	generator: {
		filename: "assets/fonts/[name].[contenthash:8][ext]",
	},
};

const config = {
	mode: isDev ? "development" : "production",
	entry: {
		index: join(PATHS.src, "pages/index.pug"),
		main: join(PATHS.scripts, "main.ts"),
	},
	output: {
		filename: "[name].[contenthash].js",
		path: PATHS.dist,
		clean: true,
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: [".ts", ".tsx", ".js"],
	},
	plugins: [
		new PugPlugin({
			pretty: true,
			js: {
				filename: "[name].[contenthash:8].js",
			},
			css: {
				filename: "[name].[contenthash:8].css",
			},
		}),
		new StylelintPlugin({
			files: "**/*.(scss)",
			fix: true,
		}),
		new EslingPlugin({
			extensions: "ts",
		}),
	],
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				loader: false,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminGenerate,
					options: {
						plugins: [],
					},
				},
			}),
		],
	},
	devServer: {
		host: "0.0.0.0",
		port: 7777,
		client: {
			logging: "error",
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		// static: {
		// 	directory: PATHS.dist,
		// },
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
		rules: [html, ts, styles, inlineSvg, images, fonts],
	},
};

module.exports = config;
