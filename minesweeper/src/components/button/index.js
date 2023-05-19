const button = {
	render(container, props = {}) {
		const { modifier, text, dataAttr } = props;
		const [dataAttrKey, dataAttrVal] = dataAttr || [];
		const element = document.createElement('button');
		element.className = `button ${(modifier) || ''}`;
		element.innerHTML = `${(text) || ''}`;
		if (dataAttr) {
			element.dataset[dataAttrKey] = dataAttrVal;
		}

		element.addEventListener('click', (ev) => {
			console.log(ev);
		});

		container.appendChild(element);
	},
};

export { button };
