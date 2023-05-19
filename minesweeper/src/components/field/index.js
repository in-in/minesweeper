import { cell } from '@components/cell';

const field = {
	render(container, state) {
		const element = document.createElement('div');
		element.className = 'field';
		element.setAttribute('style', `--size: ${state.state.field};`);
		console.log('fff', state);

		cell.render(element, state);

		container.appendChild(element);
	},
};

export { field };
