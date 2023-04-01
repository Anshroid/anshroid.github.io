let bgImage = document.querySelector("#bg-image")
document.body.onmousemove = (e) => {
	bgImage.style.setProperty("--x", -e.clientX * 0.08 + "px");
	bgImage.style.setProperty("--y", -e.clientX * 0.1 + "px");
};