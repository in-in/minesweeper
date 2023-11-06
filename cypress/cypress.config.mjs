import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:7777",
		specPattern: "cypress/e2e/**/*.{cy,test,spec}.{js,jsx,ts,tsx}",
	},
	component: {
		specPattern: "**/*.{cy,test,spec}.{js,jsx,ts,tsx}",
	},
});
