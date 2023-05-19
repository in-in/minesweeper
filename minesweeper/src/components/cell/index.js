const cell = {
	render(container, state) {
		const amountOfCells = state.state.field * state.state.field;
		for (let i = 1; i <= amountOfCells; i++) {
			const element = document.createElement('div');
			element.className = 'cell';
			container.appendChild(element);
		}
	},
};

export { cell };
