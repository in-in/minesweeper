const { join } = require("node:path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PATHS } = require("./paths");

const isDev = process.env.NODE_ENV !== "prod";

const ts = {
	test: /\.([cm]?ts|tsx)$/i,
	use: "ts-loader",
};

const styles = {
	test: /\.scss$/i,
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: "css-loader",
			options: {
					modules: {
						localIdentName: isDev ? "[folder]__[local]_[hash:base64:5]" : "[hash:base64]"
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
	test: /\.(png|webp|jpe?g|svg)$/i,
	// resourceQuery: { not: [/inline/] },
	type: "asset/resource",
	generator: {
		filename: "[path][name].[contenthash][ext]",
	},
};

// const inlineSvg = {
// 	test: /\.(svg)$/i,
// 	type: "asset/inline",
// 	resourceQuery: /inline/,
// };

const fonts = {
	test: /\.woff2$/i,
	type: "asset/resource",
	generator: {
		filename: "[path][name].[contenthash][ext]",
	},
};

const config = {
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
			'@fonts': PATHS.fonts
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
			extensions: "ts",
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
	devtool: isDev ? "eval" : false,
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
		// rules: [ts, styles, inlineSvg, images, fonts],
		rules: [ts, styles, images, fonts],
	},
};

module.exports = config;
