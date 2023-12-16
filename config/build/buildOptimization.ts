import type { Configuration } from "webpack";

import type { BuildOptions } from "./buildTypes";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

function buildOptimization({ mode }: BuildOptions): Configuration["optimization"] {
	const isProd = mode === "production";

	const minimizer = [];

	if (isProd) {
		minimizer.push(
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
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
		);
	}

	return {
		minimizer,
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	};
}

export { buildOptimization };
