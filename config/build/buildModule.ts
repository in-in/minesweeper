import type { Configuration } from "webpack";

import type { BuildOptions } from "./buildTypes";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { removeJsxAttributes } from "./transformers/removeJsxAttributes";

const assetFilename = "[name].[contenthash][ext]";
const assetModuleType = "asset/resource";

function buildModule({ mode }: BuildOptions): Configuration["module"] {
	const isDev = mode === "development";
	const isProd = mode === "production";

	const tsLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: "ts-loader",
				options: {
					compilerOptions: {
						noPropertyAccessFromIndexSignature: false,
					},
					getCustomTransformers: () => ({
						before: [
							isDev && ReactRefreshTypeScript(),
							isProd && removeJsxAttributes(["data-testid"]),
						].filter(Boolean),
					}),
				},
			},
		],
	};

	const styleLoader = {
		test: /\.(sc|c)ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
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
						plugins: [
							"autoprefixer",
							"postcss-flexbugs-fixes",
							"postcss-media-minmax",
						],
					},
				},
			},
			{
				loader: "sass-loader",
				options: {
					sassOptions: {},
				},
			},
		],
	};

	const imageLoader = {
		test: /images\/.+\.(png|svg|jpe?g|gif|webp)$/i,
		type: assetModuleType,
		generator: {
			filename: "assets/images/" + assetFilename,
		},
	};

	const svgIconLoader = {
		test: /icons\/.+\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					typescript: true,
					svgoConfig: {
						plugins: ["removeDimensions"],
					},
				},
			},
		],
	};

	const fontLoader = {
		test: /\.woff2$/i,
		type: assetModuleType,
		generator: {
			filename: "assets/fonts/" + assetFilename,
		},
	};

	const soundLoader = {
		test: /\.mp3$/i,
		type: assetModuleType,
		generator: {
			filename: "assets/sounds/" + assetFilename,
		},
	};

	return {
		rules: [
			soundLoader,
			fontLoader,
			svgIconLoader,
			imageLoader,
			styleLoader,
			tsLoader,
		],
	};
}

export { buildModule };
