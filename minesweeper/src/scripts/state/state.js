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
		this.currentState = initialState;
		this.store = new Store(name);

		if (this.store.isStorageAvailable) {
			this.currentState = this.store.load(initialState);
		}

		// this.orderItems();
	}

	static getNeighbors(i, j, arr) {
		const neighbors = [];
		const indexes = [
			[i - 1, j],
			[i, j - 1],
			[i - 1, j - 1],
			[i + 1, j],
			[i, j + 1],
			[i + 1, j + 1],
			[i + 1, j - 1],
			[i - 1, j + 1],
		];

		indexes.forEach(([a, b]) => {
			const value = arr?.[a]?.[b];

			if (value === 0 || value) {
				neighbors.push(`${a}-${b}`);
			}
		});

		return neighbors;
	}

	placeMines(ignoreCell) {
		const { level, minesAmount, field } = this.currentState;
		const getRandom = () => Math.floor(Math.random() * ((level - 1) + 1));
		const mines = new Set();

		while (minesAmount !== mines.size) {
			const mineCell = `${getRandom()}-${getRandom()}`;
			if (ignoreCell !== mineCell) {
				mines.add(mineCell);
			}
		}

		[...mines].forEach((e) => {
			const [r, c] = e.split('-');
			field[r][c] = 9;
		});

		for (let r = 0; r < field.length; r++) {
			for (let c = 0; c < field[r].length; c++) {
				const cell = `${r}-${c}`;
				if (![...mines].includes(cell)) {
					const [a, b] = cell.split('-');

					const neighbors = State.getNeighbors(+a, +b, field);

					const minedNeighbors = neighbors.reduce((acc, curr) => {
						if ([...mines].includes(curr)) {
							// eslint-disable-next-line no-param-reassign
							acc += 1;
						}

						return acc;
					}, 0);

					field[r][c] = minedNeighbors;
				}
			}
		}
	}

	changeLevel(level) {
		this.currentState.level = level;
		this.store.save(this.currentState);
		pubsub.publish('changeLevel', this);
	}

	changeMinesAmount(value) {
		this.currentState.minesAmount = value;
		this.store.save(this.currentState);
		// pubsub.publish('changeMinesAmount', value);
	}

	startGame(cell) {
		const { level } = this.currentState;
		this.currentState.phase = 'game';
		this.currentState.currentCellId = cell.dataset.cellId;
		this.currentState.field = Array(level).fill(0).map(() => Array(level).fill(0));
		this.placeMines(cell.dataset.cellId);

		this.store.save(this.currentState);

		pubsub.publish('startGame', this);
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
