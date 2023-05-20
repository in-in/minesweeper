import { range } from '@components/range';
import { toggle } from '@components/toggle';
import { stat } from '@components/stat';
import { button } from '@components/button';

const dashboard = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'dashboard';

		range.render(element);
		toggle.render(element, 'sound');
		toggle.render(element, 'day/night');
		stat.render(element, 'timer');
		stat.render(element, 'turns');
		stat.render(element, 'mines');
		button.render(element, state, {
			modifier: 'button__primary dashboard_button',
			text: 'New<br>Game',
		});

		container.appendChild(element);
	},
};

export { dashboard };
