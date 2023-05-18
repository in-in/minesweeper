import data from '../../data/data.json';
import { button } from '../button';

const level = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'level';
		container.appendChild(element);

		Object.entries(data.level).forEach(([key, val]) => {
			button.render(element, {
				modifier: 'button__primary level_button',
				text: key,
				dataAttr: ['level', val],
			});
		});
	},
};

export { level };
