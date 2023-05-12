export const textareaElement = document.createElement('textarea');

export function createTextarea(body) {
	textareaElement.className = 'textarea';
	body.append(textareaElement);
}

export default createTextarea;
