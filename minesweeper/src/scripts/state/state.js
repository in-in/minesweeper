import { Store } from '@state/store';
import { initialState } from '@state/initialState';
import { pubsub } from '@state/pubsub';

class State {
	constructor(name) {
		// this.itemId = 1;
		// this.form = {
		// 	focus: false,
		// 	valid: false,
		// };
		this.state = initialState;
		this.store = new Store(name);

		if (this.store.isStorageAvailable) {
			this.state = this.store.load(initialState);
		}

		// this.orderItems();
	}

	changeLevel(level) {
		this.state.level = level;
		this.store.save(this.state);
		pubsub.publish('changeLevel', this.state);
	}

	// saveItems() {
	// 	if (this.store.isStorageAvailable) {
	// 		this.store.save(this.items);
	// 	}
	// }

	// addItem(item) {
	// 	this.items.unshift({
	// 		id: this.itemId + 1,
	// 		status: 0,
	// 		value: item,
	// 	});
	// 	this.saveItems();
	// }

	// orderItems() {
	// 	const todo = this.items.filter((item) => item.status === 0);
	// 	const done = this.items.filter((item) => item.status === 1);
	// 	this.items = todo.concat(done);
	// }

	// findItemIndex(id) {
	// 	return this.items.findIndex((item) => item.id === id);
	// }

	// deleteItem(id) {
	// 	const itemIndex = this.findItemIndex(id);
	// 	this.items.splice(itemIndex, 1);
	// 	this.saveItems();
	// }

	// toggleItemStatus(id) {
	// 	const itemIndex = this.findItemIndex(id);
	// 	this.items[itemIndex].status = this.items[itemIndex].status ? 0 : 1;
	// 	this.orderItems();
	// 	this.saveItems();
	// }
}

export { State };
