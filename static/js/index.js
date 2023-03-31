let bgImage = document.querySelector("#bg-image")
document.body.onmousemove = (e) => {
	bgImage.animate([
		{ "--x": -e.clientX * 0.08 + "px" },
		{ "--y": -e.clientX * 0.1 + "px" },
	], 1000)
};