class Store {
	constructor(name) {
		let isStorageAvailable;
		try {
			window.localStorage.setItem('test', 'test');
			window.localStorage.removeItem('test');
			isStorageAvailable = true;
		} catch (e) {
			isStorageAvailable = false;
		}
		this.name = btoa(name);
		this.isStorageAvailable = isStorageAvailable;
	}

	save(state) {
		const json = JSON.stringify(state);
		window.localStorage.setItem(this.name, json);
	}

	load(initialState) {
		const state = window.localStorage.getItem(this.name);
		return (state && state.length) ? JSON.parse(state) : initialState;
	}
}

export { Store };
