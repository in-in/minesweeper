import { pubsub } from '@state/pubsub';

const cell = {
	el: [],
	create(id) {
		const element = document.createElement('div');
		element.className = 'cell';
		element.dataset.cellId = id;
		return element;
	},
	render(container, state) {
		const { level } = state.currentState;
		cell.el = [];

		const initialField = Array(level).fill(0).map(() => Array(level).fill(0));

		for (let r = 0; r < initialField.length; r++) {
			for (let c = 0; c < initialField[r].length; c++) {
				const id = `${r}-${c}`;
				const element = cell.create(id);

				element.addEventListener('click', (ev) => {
					const { target } = ev;
					state.start(target);
				});

				cell.el.push(element);
			}
		}

		container.replaceChildren(...cell.el);

		pubsub.subscribe('start', cell.update);
	},
	update(state) {
		const { field, currentCellId } = state.currentState;
		const currentEl = cell.el;
		const newEl = [];

		for (let r = 0; r < field.length; r++) {
			for (let c = 0; c < field[r].length; c++) {
				const { id } = field[r][c];
				const element = cell.create(id);
				element.dataset.cell = field[r][c].value;

				if (currentCellId === id) {
					element.classList.add('cell__open');
					element.setAttribute('disabled', true);
					state.play(element);
				}

				newEl.push(element);

				element.addEventListener('click', (ev) => {
					const { target } = ev;
					target.classList.add('cell__open');
					target.setAttribute('disabled', true);
					state.play(element);
				});
			}
		}

		currentEl.forEach((el, idx) => el.replaceWith(newEl[idx]));
		cell.el = newEl;
	},
};

export { cell };
