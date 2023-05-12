import data from '../../data/data.json';
import { textareaElement } from '../textarea/textarea';

let caps = false;

function createKey(keyData, lang) {
	const {
		value, size, type, code,
	} = keyData;
	const [defaultVal] = value[lang];
	const key = document.createElement('div');
	const keyButton = document.createElement('button');

	key.className = 'key';
	key.setAttribute('style', `--ratio: ${size};`);
	keyButton.className = `key__button key__button--${type}`;
	keyButton.dataset.code = code;
	keyButton.innerHTML = defaultVal;

	key.append(keyButton);

	return key;
}

function appendKey() {
	let lang = '';
	if (!localStorage.getItem('vkLang')) {
		localStorage.setItem('vkLang', 'en');
		lang = 'en';
	} else {
		lang = localStorage.getItem('vkLang');
	}
	Object.entries(data).forEach((el) => {
		const row = document.getElementById(el[0]);
		el[1].forEach((i) => row.append(createKey(i, lang)));
	});
}

function changeLang() {
	const lang = (localStorage.getItem('vkLang') === 'en') ? 'ru' : 'en';
	localStorage.setItem('vkLang', lang);

	Object.values(data).flat().forEach((el) => {
		const { value, type, code } = el;
		const [defaultVal] = value[lang];
		if (type === 'default') {
			const btn = document.querySelector(`[data-code=${code}]`);
			btn.textContent = defaultVal;
		}
	});
}

function capsLockHandler() {
	const lang = localStorage.getItem('vkLang');
	const capsLockBtn = document.querySelector('[data-code="CapsLock"]');
	capsLockBtn.classList.toggle('key__button--active');

	Object.values(data).flat().forEach((el) => {
		const { value, type, code } = el;
		const [defaultVal] = value[lang];
		if (type === 'default') {
			const btn = document.querySelector(`[data-code=${code}]`);

			btn.textContent = caps ? defaultVal.toLowerCase() : defaultVal.toUpperCase();
		}
	});

	caps = !caps;
}

function shiftHandler(shift) {
	const lang = localStorage.getItem('vkLang');

	Object.values(data).flat().forEach((el) => {
		const { value, type, code } = el;
		const [defaultVal, shiftVal] = value[lang];
		if (type === 'default') {
			const btn = document.querySelector(`[data-code=${code}]`);
			btn.textContent = shift
				? shiftVal || defaultVal.toUpperCase()
				: defaultVal;
		}
	});
}

function typeChar(btn, code) {
	const char = (btn && !btn.classList.contains('key__button--modifier'))
		? btn.textContent
		: '';

	if (code === 'Enter') {
		textareaElement.setRangeText(
			'\n',
			textareaElement.selectionStart,
			textareaElement.selectionEnd,
			'end',
		);
	}

	if (code === 'Tab') {
		textareaElement.setRangeText(
			'    ',
			textareaElement.selectionStart,
			textareaElement.selectionEnd,
			'end',
		);
	}

	if (code === 'Backspace') {
		textareaElement.setRangeText(
			'',
			(textareaElement.selectionStart > 0) ? textareaElement.selectionStart - 1 : 0,
			textareaElement.selectionEnd,
			'end',
		);
	}
	if (code === 'Delete') {
		textareaElement.setRangeText(
			'',
			textareaElement.selectionStart,
			textareaElement.selectionEnd + 1,
			'end',
		);
	}

	textareaElement.setRangeText(
		char,
		textareaElement.selectionStart,
		textareaElement.selectionEnd,
		'end',
	);
}

function keyDownHandler(ev) {
	ev.preventDefault();
	const { code, altKey, ctrlKey } = ev;

	const btn = document.querySelector(`[data-code=${code}]`);

	if ((code === 'ControlLeft' && altKey) || (code === 'AltLeft' && ctrlKey)) {
		caps = false;
		document.querySelector('[data-code="CapsLock"]')
			.classList.remove('key__button--active');

		changeLang();
	}

	if (code === 'ShiftLeft' || code === 'ShiftRight') {
		shiftHandler(true);
	}

	if (btn && code === 'CapsLock') {
		capsLockHandler();
	}

	if (btn && code !== 'CapsLock') {
		btn.classList.add('key__button--active');
	}

	typeChar(btn, code);
}

function keyUpHandler(ev) {
	const { code } = ev;
	const btn = document.querySelector(`[data-code=${code}]`);

	if (btn && code !== 'CapsLock') {
		btn.classList.remove('key__button--active');
	}

	if (code === 'ShiftLeft' || code === 'ShiftRight') {
		shiftHandler(false);
		if (caps) capsLockHandler();
	}
}

function mouseDownHandler(ev) {
	const { target } = ev;
	const isButton = target.classList.contains('key__button');
	const { code } = target.dataset;

	if (isButton && code !== 'CapsLock') {
		target.classList.add('key__button--active');
	}

	if (isButton) {
		document.dispatchEvent(new KeyboardEvent('keydown', { code }));
	}
}

function mouseUpHandler(ev) {
	const { target } = ev;
	const isButton = target.classList.contains('key__button');
	const { code } = target.dataset;

	ev.preventDefault();

	if (isButton && code !== 'CapsLock') {
		target.classList.remove('key__button--active');
	}

	if (isButton) {
		document.dispatchEvent(new KeyboardEvent('keyup', { code }));
	}
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousedown', mouseDownHandler);
document.addEventListener('mouseup', mouseUpHandler);
document.addEventListener('mouseout', mouseUpHandler);
window.addEventListener('blur', () => {
	document.querySelectorAll('.key__button').forEach((el) => {
		el.classList.remove('key__button--active');
	});
});

export default appendKey;
