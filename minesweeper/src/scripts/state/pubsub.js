export const pubsub = {
	events: {},
	subscribe(evName, fn) {
		this.events[evName] = this.events[evName] || [];
		this.events[evName].push(fn);
	},
	publish(evName, data) {
		if (this.events[evName]) {
			this.events[evName].forEach((f) => {
				f(data);
			});
		}
	},
};
