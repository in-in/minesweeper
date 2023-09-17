import { projectName } from "@utils/projectName";

type LocalStorageWrapper = {
	setItem: (value: string, key?: string) => void;
	getItem: (key: string) => string | null;
} | null;

function isLocalStorageAvailable(): boolean {
	try {
		const testKey = "_test_";
		localStorage.setItem(testKey, testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

function localStorageWrapper(): LocalStorageWrapper {
	if (!isLocalStorageAvailable()) {
		return null;
	}

	return {
		setItem(value: string, key = projectName): void {
			localStorage.setItem(key, value);
		},
		getItem(key = projectName): string | null {
			return localStorage.getItem(key);
		},
	};
}

export { localStorageWrapper };
