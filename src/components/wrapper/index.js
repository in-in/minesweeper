import { dashboard } from '@components/dashboard';
import { field } from '@components/field';
import { level } from '@components/level';
import { scoretable } from '@components/scoretable';

const wrapper = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'wrapper';

		dashboard.render(element, state);
		field.render(element, state);
		level.render(element, state);
		scoretable.render(element, state);

		container.appendChild(element);
	},
};

export { wrapper };
