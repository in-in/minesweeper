import { range } from '../range';

const dashboard = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'dashboard';

		range.render(element);

		container.appendChild(element);
	},
};

export { dashboard };
