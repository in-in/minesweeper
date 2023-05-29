import { pubsub } from '@state/pubsub';
import { button } from '@components/button';
import data from '@data/data.json';

const level = {
	levelEl: {},
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'level';

		Object.entries(data.level).forEach(([key, val]) => {
			button.render(element, state, {
				modifier: 'button__primary level_button',
				text: key,
				dataAttr: ['level', val],
			});
		});

		level.levelEl = element;

		container.appendChild(element);

		pubsub.subscribe('start', level.start);
		pubsub.subscribe('restart', level.restart);
	},
	start() {
		Object.values(level.levelEl.children)
			.forEach((el) => el.setAttribute('disabled', true));
	},
	restart() {
		Object.values(level.levelEl.children)
			.forEach((el) => el.removeAttribute('disabled'));
	},
};

export { level };
