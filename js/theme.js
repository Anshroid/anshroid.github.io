document.querySelector("#theme-changer").onclick = () => {
	let next = document.body.getAttribute('data-color-mode') === 'light' ? 'dark' : 'light';

	document.body.setAttribute('data-color-mode', next);
	document.body.setAttribute('data-dark-theme', next);

	document.querySelector('#moon').classList.toggle('v-hidden');
	document.querySelector('#sun').classList.toggle('v-hidden');

	window.localStorage.setItem('data-theme', next);
};

let theme = window.localStorage.getItem('data-theme');
if (theme) {
	document.body.setAttribute('data-color-mode', theme);
	document.body.setAttribute('data-dark-theme', theme);

	if (theme === 'light') {
		document.querySelector('#moon').classList.toggle('v-hidden');
		document.querySelector('#sun').classList.toggle('v-hidden');
	}
}