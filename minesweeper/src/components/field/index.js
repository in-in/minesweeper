import { pubsub } from '@state/pubsub';
import { cell } from '@components/cell';

const field = {
	containerEl: {},
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${state.level};`);

		cell.render(element, state);
		this.containerEl = container;
		container.appendChild(element);
		pubsub.subscribe('changeLevel', field.changeLevel);
	},
	changeLevel(state) {
		field.render(field.containerEl, state);
	},
};

export { field };
