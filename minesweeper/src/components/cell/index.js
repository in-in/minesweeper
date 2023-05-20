const cell = {
	render(container, state) {
		const { currentState } = state;
		const amountOfCells = currentState.level * currentState.level;
		for (let i = 1; i <= amountOfCells; i++) {
			const element = document.createElement('div');
			element.className = 'cell';

			element.addEventListener('click', (ev) => {
				const { target } = ev;
				state.startGame(target);
			});

			container.appendChild(element);
		}
	},
};

export { cell };
