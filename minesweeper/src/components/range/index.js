const range = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'range';

		const label = document.createElement('label');
		label.className = 'range_title';
		label.setAttribute('for', 'mines');
		label.innerHTML = 'mines <br> amount';
		element.appendChild(label);

		const select = document.createElement('select');
		select.className = 'range_select';
		select.setAttribute('id', 'mines');
		element.appendChild(select);

		Array.from({ length: 90 }, (_, i) => i + 10).forEach((el) => {
			const option = document.createElement('option');
			option.className = 'range_select-option';
			option.setAttribute('value', el);
			option.textContent = el;
			select.appendChild(option);
		});

		select.value = state.currentState.minesAmount;

		element.addEventListener('change', (ev) => {
			const { target } = ev;
			state.changeMinesAmount(Number(target.value));
		});

		container.appendChild(element);
	},
};

export { range };
