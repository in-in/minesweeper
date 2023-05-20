import { pubsub } from '@state/pubsub';
import { cell } from '@components/cell';

const field = {
	el: {},
	create(state) {
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${state.level};`);

		cell.render(element, state);
		return element;
	},
	render(container, state) {
		const element = this.create(state);

		this.el = element;

		container.appendChild(element);

		pubsub.subscribe('changeLevel', this.update);
	},
	update(state) {
		const newEl = field.create(state);
		const currentEl = field.el;

		currentEl.replaceWith(newEl);

		field.el = newEl;
	},
};

export { field };
