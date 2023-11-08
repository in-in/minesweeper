import webpackPreprocessor from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import { resolve } from "node:path";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:7777",
		specPattern: "cypress/e2e/**/*.{cy,test,spec}.{js,jsx,ts,tsx}",
		setupNodeEvents(on) {
			on(
				"file:preprocessor",
				webpackPreprocessor({
					webpackOptions: {
						resolve: {
							extensions: [".ts", ".tsx", ".js"],
							alias: {
								"@": resolve(__dirname, "../src"),
							},
						},
						module: {
							rules: [
								{
									test: /\.([cm]?ts|tsx)$/i,
									exclude: [/node_modules/],
									use: [
										{
											loader: "ts-loader",
										},
									],
								},
							],
						},
					},
				}),
			);
		},
	},
});
