import { pubsub } from '@state/pubsub';
import { cell } from '@components/cell';

const field = {
	el: {},
	create(state) {
		const { currentState } = state;
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${currentState.level}`);

		cell.render(element, state);

		return element;
	},
	render(container, state) {
		const element = field.create(state);

		field.el = element;

		container.appendChild(element);

		pubsub.subscribe('changeLevel', field.update);
		pubsub.subscribe('loseGame', field.end);
	},
	update(state) {
		const newEl = field.create(state);
		const currentEl = field.el;

		currentEl.replaceWith(newEl);

		field.el = newEl;
	},
	end(state) {
		const msg = state[1];
		Object.values(field.el.children)
			.forEach((el) => el.setAttribute('disabled', true));
		field.el.classList.add('field__message');
		field.el.dataset.msg = msg;
	},
};

export { field };
