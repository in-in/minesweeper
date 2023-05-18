const button = {
	render(container, props = {}) {
		const { modifier, text, dataAttr } = props;
		const [dataAttrKey, dataAttrVal] = dataAttr || [];
		const element = document.createElement('button');
		element.className = `button ${(modifier) || ''}`;
		element.textContent = `${(text) || ''}`;
		if (dataAttr) {
			element.dataset[dataAttrKey] = dataAttrVal;
		}
		container.appendChild(element);
	},
};

export { button };
