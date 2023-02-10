document.querySelector("#theme-changer").onclick = () => {
	let next = document.body.getAttribute('data-color-mode') === 'light' ? 'dark' : 'light';

	document.body.setAttribute('data-color-mode', next);
	document.body.setAttribute('data-dark-theme', next);

	document.querySelector('#moon').classList.toggle('v-hidden');
	document.querySelector('#sun').classList.toggle('v-hidden');
};

let bgImage = document.querySelector("#bg-image")
document.body.onmousemove = (e) => {
	bgImage.style.setProperty('--x', -e.clientX * 0.1 + "px");
	bgImage.style.setProperty('--y', -e.clientY * 0.1 + "px");
};