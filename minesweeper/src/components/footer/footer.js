export function createFooter(body) {
	const footer = document.createElement('footer');
	const text1 = document.createElement('p');
	const text2 = document.createElement('p');

	footer.className = 'footer';
	text1.className = 'footer__text';
	text2.className = 'footer__text';
	text1.textContent = 'Keyboard created in the Linux Mint operating system';
	text2.innerHTML = 'To switch the keyboard language use: left <kbd>Ctrl</kbd> + <kbd>Alt</kbd>';

	footer.append(text1, text2);
	body.append(footer);
}

export default createFooter;
