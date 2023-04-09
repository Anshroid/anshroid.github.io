let stars = document.querySelectorAll(".magic-star");
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let index = 0
function animate(star) {
    star.style.setProperty("--star-left", (rand(-10, 10) + 50) + "%");
    star.style.setProperty("--star-top", (rand(-40, 20) + 50) + "%");

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = null;
}
for (let star of stars) {
    setTimeout(() => {
        animate(star)
        setInterval(() => animate(star), 1000)
    }, index * 300)
    index++;
}

for (const splitSentence of document.querySelectorAll(".split")) {
    console.log(splitSentence.scrollWidth, Math.floor(splitSentence.getBoundingClientRect().width))
    if (splitSentence.scrollWidth >= Math.floor(splitSentence.getBoundingClientRect().width)) {
        const text = splitSentence.innerText;
        console.log("splitting '" + text + "'")
        splitSentence.innerText = "";
        for (let word of text.split(" ")) {
            let span = document.createElement("span");
            span.innerText = word;
            span.classList.add("split-word");
            splitSentence.appendChild(span);
            splitSentence.appendChild(document.createTextNode(" "));
        }
    }
}

for (const splitText of document.querySelectorAll(".split-word")) {
    const text = splitText.innerText;
    splitText.innerText = "";
    for (let char of text.split("")) {
        let span = document.createElement("span");
        span.innerText = char;
        splitText.appendChild(span);
    }
}

let existingToastTimeout = null;
document.querySelector("#discord").onclick = () => {
    navigator.clipboard.writeText("Anshroid#0810").then(() => {});
    document.querySelector("#toast").classList.remove("Toast--animateOut");
    document.querySelector("#toast").classList.add("d-none")
    document.querySelector("#toast").classList.remove("d-none")
    if (existingToastTimeout) clearTimeout(existingToastTimeout);
    existingToastTimeout = setTimeout(() => document.querySelector("#toast").classList.add("Toast--animateOut"), 2000);
}