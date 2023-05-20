import { pubsub } from '@state/pubsub';
import { cell } from '@components/cell';

const field = {
	el: {},
	create(state) {
		const { currentState } = state;
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${currentState.level};`);

		cell.render(element, state);
		return element;
	},
	render(container, state) {
		const element = field.create(state);

		field.el = element;

		container.appendChild(element);

		pubsub.subscribe('changeLevel', field.update);
	},
	update(state) {
		const newEl = field.create(state);
		const currentEl = field.el;

		currentEl.replaceWith(newEl);

		field.el = newEl;
	},
};

export { field };
