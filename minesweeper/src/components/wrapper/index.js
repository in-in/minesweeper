import { dashboard } from '@components/dashboard';
import { field } from '@components/field';
import { level } from '@components/level';
import { scoretable } from '@components/scoretable';

const wrapper = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'wrapper';

		dashboard.render(element);
		field.render(element, state);
		level.render(element);
		scoretable.render(element);

		container.appendChild(element);
	},
};

export { wrapper };
