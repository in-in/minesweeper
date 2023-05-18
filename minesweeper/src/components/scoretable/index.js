const scoretable = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'scoretable';

		const row = document.createElement('div');
		row.className = 'scoretable_row';
		element.appendChild(row);

		['Score', 'Time', 'Date'].forEach((el) => {
			const cell = document.createElement('div');
			cell.className = 'scoretable_cell scoretable_cell-title';
			cell.textContent = el;
			row.appendChild(cell);
		});

		container.appendChild(element);
	},
};

export { scoretable };
