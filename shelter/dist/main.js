/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
const menuLinkList = document.querySelectorAll('.menu_link');
const activeClass = 'menu_link-active';
menuLinkList.forEach((link) => {
	link.addEventListener('click', (e) => {
		const el = e.target;
		const siblings = [...el.parentNode.parentNode.children]
			.filter((child) => child.children[0] !== el);
		el.classList.toggle(activeClass);
		siblings.map((i) => i.children[0].classList.remove(activeClass));
	});
});

/******/ })()
;