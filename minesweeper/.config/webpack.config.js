/* eslint-disable import/no-extraneous-dependencies */
const { join } = require('path');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const PugPlugin = require('pug-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { PATHS } = require('./paths');

const isDev = process.env.NODE_ENV !== 'prod';

const html = {
	test: /\.pug$/,
	loader: PugPlugin.loader,
	options: {
		data: {
			isDev,
		},
	},
};

const styles = {
	test: /\.scss$/,
	use: [
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					config: PATHS.config,
				},
			},
		},
		{
			loader: 'sass-loader',
			options: {
				sassOptions: {
					indentType: 'tab',
					indentWidth: 1,
					outputStyle: 'expanded',
					includePaths: [
						PATHS.components,
						PATHS.styles,
					],
				},
			},
		},
	],
};

const images = {
	test: /\.(png|webp|jpg|jpeg|svg)$/i,
	resourceQuery: { not: [/inline/] },
	type: 'asset/resource',
	generator: {
		filename: 'images/[name]_[hash:5][ext]',
	},
};

const inlineSvg = {
	test: /\.(svg)$/i,
	type: 'asset/inline',
	resourceQuery: /inline/,
};

const fonts = {
	test: /\.(woff2|woff)$/i,
	type: 'asset/resource',
	generator: {
		filename: '[name][ext]',
	},
};

const config = {
	mode: isDev ? 'development' : 'production',
	entry: {
		index: join(PATHS.src, 'pages/index.pug'),
		main: join(PATHS.scripts, 'main.js'),
	},
	output: {
		path: PATHS.dist,
		clean: true,
	},
	resolve: {
		alias: {
			'@images': PATHS.images,
			'@scripts': PATHS.scripts,
			'@styles': PATHS.styles,
			'@fonts': PATHS.fonts,
		},
	},
	plugins: [
		new PugPlugin({
			pretty: true,
		}),
		new StylelintPlugin({
			files: '**/*.(scss)',
			fix: true,
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
			new ImageMinimizerPlugin({
				loader: false,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminGenerate,
					options: {
						plugins: [
							['gifsicle', { interlaced: true }],
							['mozjpeg', {
								progressive: true,
								quality: 90,
							}],
							['optipng', { optimizationLevel: 3 }],
						],
					},
				},
			}),
		],
	},
	devServer: {
		host: '0.0.0.0',
		port: 7777,
		client: {
			logging: 'error',
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		static: {
			directory: PATHS.dist,
		},
		watchFiles: {
			paths: ['src/**/*.*'],
			options: {
				usePolling: true,
			},
		},
		devMiddleware: {
			stats: false,
		},
	},
	module: {
		rules: [
			html,
			styles,
			inlineSvg,
			images,
			fonts,
		],
	},
};

module.exports = config;