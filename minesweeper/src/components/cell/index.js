import { state } from '@state/state';

const cell = {
	render(container) {
		const amountOfCells = state.field * state.field;
		for (let i = 1; i <= amountOfCells; i++) {
			const element = document.createElement('div');
			element.className = 'cell';
			container.appendChild(element);
		}
	},
};

export { cell };
