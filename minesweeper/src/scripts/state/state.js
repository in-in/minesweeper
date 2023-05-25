import { Store } from '@state/store';
import { initialState } from '@state/initialState';
import { pubsub } from '@state/pubsub';

class State {
	constructor(name) {
		this.currentState = initialState;
		this.store = new Store(name);

		if (this.store.isStorageAvailable) {
			this.currentState = this.store.load(initialState);
		}
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

			if (value) {
				neighbors.push(`${a}-${b}`);
			}
		});

		return neighbors;
	}

	static getRandom(max) {
		return Math.floor(Math.random() * ((max - 1) + 1));
	}

	placeMines(ignoreCell) {
		const { level, minesAmount, field } = this.currentState;
		const mines = new Set();

		while (minesAmount !== mines.size) {
			const mineCell = `${State.getRandom(level)}-${State.getRandom(level)}`;
			if (ignoreCell !== mineCell) {
				mines.add(mineCell);
			}
		}

		[...mines].forEach((e) => {
			const [r, c] = e.split('-');
			field[r][c].value = 9;
			field[r][c].id = `${r}-${c}`;
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

					field[r][c].value = minedNeighbors;
					field[r][c].id = cell;
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

	start(cell) {
		const { level } = this.currentState;
		this.currentState.phase = 'play';
		this.currentState.currentCellId = cell.dataset.cellId;
		this.currentState.field = Array(level).fill(0).map(() => Array(level).fill()
			.map(() => ({
				id: '',
				value: 0,
				isOpen: false,
				isFlagSet: false,
			})));
		this.placeMines(cell.dataset.cellId);

		this.store.save(this.currentState);

		pubsub.publish('start', this);
	}

	play(cell) {
		const { cellId } = cell.dataset;
		const { field } = this.currentState;

		if (cell.dataset.cell === '9') {
			this.currentState.phase = 'lose';

			this.store.save(this.currentState);

			pubsub.publish('loseGame', [this, 'Game over. Try again']);
		} else {
			for (let r = 0; r < field.length; r++) {
				for (let c = 0; c < field[r].length; c++) {
					if (field[r][c].id === cellId) {
						field[r][c].isOpen = true;
					}
				}
			}
			const closedCell = field.flat().reduce((acc, curr) => {
				if (curr.value !== 9 && !curr.isOpen) {
					// eslint-disable-next-line no-param-reassign
					acc += 1;
				}
				return acc;
			}, 0);

			if (closedCell === 0) {
				this.currentState.phase = 'win';

				this.store.save(this.currentState);

				pubsub.publish('winGame', [this, 'Hooray! You found all mines in ## seconds and N moves!']);
			}

			this.store.save(this.currentState);
		}
	}

	restart() {
		this.placeMines();
		this.currentState.phase = 'idle';

		this.store.save(this.currentState);

		pubsub.publish('restart', this);
	}
}

export { State };
