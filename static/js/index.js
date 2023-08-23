let bgImage = document.querySelector("#bg-image")

let stopMovingInterval;
document.body.onmousemove = (e) => {
    clearInterval(stopMovingInterval);
    bgImage.animate([{
        backgroundPositionX: -e.clientX * 0.08 + "px",
        backgroundPositionY: -e.clientY * 0.10 + "px"
    }], 500);

    stopMovingInterval = setInterval(() => {
        bgImage.style.setProperty("background-position-x", -e.clientX * 0.08 + "px");
        bgImage.style.setProperty("background-position-y", -e.clientY * 0.10 + "px");
    }, 400)
};