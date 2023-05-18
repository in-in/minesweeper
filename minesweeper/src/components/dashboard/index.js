import { range } from '../range';
import { toggle } from '../toggle';
import { stat } from '../stat';

const dashboard = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'dashboard';

		range.render(element);
		toggle.render(element, 'sound');
		toggle.render(element, 'day/night');
		stat.render(element, 'timer');
		stat.render(element, 'turns');
		stat.render(element, 'mines');

		container.appendChild(element);
	},
};

export { dashboard };
