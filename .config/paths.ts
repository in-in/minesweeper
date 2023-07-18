import { join } from "node:path";

const PATHS = {
	root: process.cwd(),
	get src() {
		return join(this.root, "src");
	},
	get dist() {
		return join(this.root, "dist");
	},
	get config() {
		return join(this.root, ".config");
	},
	get components() {
		return join(this.src, "components");
	},
	get styles() {
		return join(this.src, "styles");
	},
	get images() {
		return join(this.root, "assets", "images");
	},
	get fonts() {
		return join(this.root, "assets", "fonts");
	},
	get state() {
		return join(this.src, "state");
	},
};

export { PATHS };
