import { State } from '@state/state';
import { wrapper } from '@components/wrapper';

class Main {
	constructor(name) {
		this.name = name;
		this.state = new State(name);
		this.init = wrapper.render(document.body, this.state);

		// this.dom = {
		// 	button: document.querySelector('button'),
		// 	date: document.querySelector('h2'),
		// 	form: document.querySelector('form'),
		// 	input: document.querySelector('input'),
		// 	list: document.querySelector('ul'),
		// };
		// this.bindEvents();
		// this.render();
	}

	// bindEvents() {
	// 	this.dom.list.addEventListener('click', this.handleClick.bind(this));
	// 	this.dom.form.addEventListener('submit', this.submitForm.bind(this));
	// 	this.dom.input.addEventListener('keyup', this.keyUp.bind(this));
	// }

	// submitForm(event) {
	// 	event.preventDefault();
	// 	if (!this.dom.input.value.length) {
	// 		return;
	// 	}
	// 	this.state.addItem(this.dom.input.value);
	// 	this.dom.input.value = '';
	// 	this.render();
	// }

	// handleClick(event) {
	// 	const e = event;
	// 	if (e && e.target) {
	// 		const element = e.target.type;
	// 		if (element === 'submit' || element === 'checkbox') {
	// 			const id = parseInt(e.target.parentNode.getAttribute('data-id'), 10);
	// 			if (element === 'submit') {
	// 				this.state.deleteItem(id);
	// 			} else {
	// 				this.state.toggleItemStatus(id);
	// 			}
	// 		}
	// 	}
	// 	this.render();
	// }

	// render() {
	// 	let listHTML = '';

	// 	this.state.items.forEach((item) => {
	// 		const className = item.status ? 'done' : '';
	// 		listHTML += `<li class="${className}" data-id="${item.id}">`;
	// 		listHTML += `<input type="checkbox"${item.status ? ' checked' : ''}>`;
	// 		listHTML += `${item.value}<button>x</button></li>`;
	// 	});

	// 	this.dom.date.innerHTML = this.state.date;
	// 	this.dom.form.classList.toggle('valid', this.state.form.valid);
	// 	this.dom.list.innerHTML = listHTML;
	// }

	// keyUp() {
	// 	this.state.form.valid = (this.dom.input.value.length) ? 1 : 0;
	// 	this.render();
	// }
}

const main = new Main('minesweeper');
export { main };
