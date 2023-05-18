const stat = {
	render(container, name) {
		const id = name.replace(/[^a-z0-9]/ig, '-');

		const element = document.createElement('div');
		element.className = 'stat';
		element.setAttribute('id', `stat-${id}`);

		const title = document.createElement('span');
		title.className = 'stat_title';
		title.textContent = name;
		element.appendChild(title);

		const number = document.createElement('span');
		number.className = 'stat_number';
		number.textContent = 0;
		element.appendChild(number);

		container.appendChild(element);
	},
};

export { stat };
