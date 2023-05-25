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
		this.currentState.phase = 'play';
		this.currentState.currentCellId = cell.dataset.cellId;
		this.currentState.field = Array(level).fill(0).map(() => Array(level).fill(0));
		this.placeMines(cell.dataset.cellId);

		this.store.save(this.currentState);

		pubsub.publish('startGame', this);
	}

	play(cell) {
		if (cell.dataset.cell === '9') {
			this.currentState.phase = 'lose';

			this.store.save(this.currentState);

			pubsub.publish('loseGame', [this, 'Game over. Try again']);
		}
	}
}

export { State };
