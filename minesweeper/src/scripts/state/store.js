class Store {
	constructor(name) {
		let islocalStorageAvailable;
		try {
			window.localStorage.setItem('test', 'test');
			window.localStorage.removeItem('test');
			islocalStorageAvailable = true;
		} catch (e) {
			islocalStorageAvailable = false;
		}
		this.name = btoa(name);
		this.islocalStorageAvailable = islocalStorageAvailable;
	}

	save(items) {
		const json = JSON.stringify(items);
		window.localStorage.setItem(this.name, json);
	}

	load() {
		const items = window.localStorage.getItem(this.name);
		return (items && items.length) ? JSON.parse(items) : [];
	}
}

export { Store };
