document.querySelectorAll(".theme-changer").forEach(elem => {elem.onclick = () => {
	let next = document.body.getAttribute('data-color-mode') === 'light' ? 'dark' : 'light';

	document.body.setAttribute('data-color-mode', next);
	document.body.setAttribute('data-dark-theme', next);

	document.querySelectorAll('.moon').forEach(elem => elem.classList.toggle('d-none'));
	document.querySelectorAll('.sun').forEach(elem => elem.classList.toggle('d-none'));

	window.localStorage.setItem('data-theme', next);
}});

let theme = window.localStorage.getItem('data-theme');
if (theme) {
	document.body.setAttribute('data-color-mode', theme);
	document.body.setAttribute('data-dark-theme', theme);
	if (theme === 'light') {
		document.querySelectorAll('.moon').forEach(elem => elem.classList.toggle('d-none'));
		document.querySelectorAll('.sun').forEach(elem => elem.classList.toggle('d-none'));
	}
}