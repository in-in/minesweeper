const wrapper = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'wrapper';
		container.appendChild(element);
		return element;
	},
};

export { wrapper };
