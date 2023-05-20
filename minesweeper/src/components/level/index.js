import { button } from '@components/button';
import data from '@data/data.json';

const level = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'level';
		container.appendChild(element);

		Object.entries(data.level).forEach(([key, val]) => {
			button.render(element, state, {
				modifier: 'button__primary level_button',
				text: key,
				dataAttr: ['level', val],
			});
		});
	},
};

export { level };
