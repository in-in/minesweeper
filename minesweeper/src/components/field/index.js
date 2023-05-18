import { state } from '../../scripts/store/state';
import { cell } from '../cell';

const field = {
	render(container) {
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${state.field};`);

		cell.render(element);

		container.appendChild(element);
	},
};

export { field };
