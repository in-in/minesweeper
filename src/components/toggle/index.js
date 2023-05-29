const toggle = {
	render(container, name) {
		const id = name.replace(/[^a-z0-9]/ig, '-');

		const element = document.createElement('div');
		element.className = 'toggle';

		const label = document.createElement('label');
		label.className = 'toggle_title';
		label.setAttribute('for', `toggle-${id}`);
		label.textContent = name;
		element.appendChild(label);

		const input = document.createElement('input');
		input.className = 'toggle_input';
		input.setAttribute('id', `toggle-${id}`);
		input.setAttribute('name', `toggle-${id}`);
		input.setAttribute('type', 'checkbox');
		element.appendChild(input);

		container.appendChild(element);
	},
};

export { toggle };
