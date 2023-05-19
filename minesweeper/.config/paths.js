const { join } = require('node:path');

const PATHS = {
	root: process.cwd(),
	get src() { return join(this.root, 'src'); },
	get dist() { return join(this.root, 'dist'); },
	get config() { return join(this.root, '.config'); },
	get components() { return join(this.src, 'components'); },
	get styles() { return join(this.src, 'styles'); },
	get scripts() { return join(this.src, 'scripts'); },
	get state() { return join(this.scripts, 'state'); },
	get images() { return join(this.src, 'images'); },
	get fonts() { return join(this.src, 'fonts'); },
	get data() { return join(this.src, 'data'); },
};

module.exports = { PATHS };
