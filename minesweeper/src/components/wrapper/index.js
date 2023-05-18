import { dashboard } from '../dashboard';
import { field } from '../field';
import { level } from '../level';
import { scoretable } from '../scoretable';

const wrapper = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'wrapper';

		dashboard.render(element);
		field.render(element);
		level.render(element);
		scoretable.render(element);

		container.appendChild(element);
	},
};

export { wrapper };
