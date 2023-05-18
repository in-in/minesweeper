import { range } from '../range';
import { toggle } from '../toggle';
import { stat } from '../stat';
import { button } from '../button';

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
		button.render(element, {
			modifier: 'button__primary dashboard_button',
			text: 'New<br>Game',
		});

		container.appendChild(element);
	},
};

export { dashboard };
