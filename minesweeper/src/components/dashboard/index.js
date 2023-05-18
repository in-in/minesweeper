import { range } from '../range';
import { toggle } from '../toggle';

const dashboard = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'dashboard';

		range.render(element);
		toggle.render(element, 'sound');
		toggle.render(element, 'day/night');

		container.appendChild(element);
	},
};

export { dashboard };
