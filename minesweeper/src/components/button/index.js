const button = {
	render(container, state, props = {}) {
		const { modifier, text, dataAttr } = props;
		const [dataAttrKey, dataAttrVal] = dataAttr || [];
		const element = document.createElement('button');
		element.className = `button ${(modifier) || ''}`;
		element.innerHTML = `${(text) || ''}`;

		if (dataAttr) {
			element.dataset[dataAttrKey] = dataAttrVal;
			if (+dataAttrVal === +state.currentState.level) {
				element.classList.add('button__active');
			}
		}

		element.addEventListener('click', (ev) => {
			const { target } = ev;
			if (target.dataset.level) {
				target.parentNode.querySelectorAll('[data-level]')
					.forEach((el) => el.classList.remove('button__active'));
				target.classList.add('button__active');
				state.changeLevel(Number(target.dataset.level));
			}
		});

		container.appendChild(element);
	},
};

export { button };
