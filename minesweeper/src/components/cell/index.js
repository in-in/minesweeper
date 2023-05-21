import { pubsub } from '@state/pubsub';

const cell = {
	el: [],
	create() {
		const element = document.createElement('div');
		element.className = 'cell';
		return element;
	},
	render(container, state) {
		const { currentState } = state;
		const amountOfCells = currentState.level * currentState.level;
		cell.el = [];

		for (let i = 1; i <= amountOfCells; i++) {
			const element = cell.create(state);

			element.addEventListener('click', (ev) => {
				const { target } = ev;
				state.startGame(target);
			});

			cell.el.push(element);
		}

		container.replaceChildren(...cell.el);

		pubsub.subscribe('startGame', cell.update);
	},
	update(state) {
		const { field } = state.currentState;
		const currentEl = cell.el;
		const newEl = [];

		for (let i = 0; i < field.length; i++) {
			for (let j = 0; j < field[i].length; j++) {
				const element = cell.create(state);
				element.textContent = field[i][j];
				newEl.push(element);
			}
		}

		currentEl.forEach((el, idx) => el.replaceWith(newEl[idx]));
	},
};

export { cell };
