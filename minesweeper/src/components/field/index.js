import { state } from '../../scripts/store/state';

const field = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${state.field};`);
		container.appendChild(element);
	},
};

export { field };
