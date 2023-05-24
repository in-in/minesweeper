import { pubsub } from '@state/pubsub';

const range = {
	selectEl: {},
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

		range.selectEl = select;

		element.addEventListener('change', (ev) => {
			const { target } = ev;
			state.changeMinesAmount(Number(target.value));
		});

		container.appendChild(element);

		pubsub.subscribe('startGame', range.update);
	},
	update(state) {
		const { phase } = state.currentState;

		if (phase === 'game') {
			range.selectEl.setAttribute('disabled', true);
		}
	},
};

export { range };
