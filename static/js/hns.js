let deckElem = document.getElementById('deck');
let bufferElem = document.getElementById('buffer');
let handElem = document.getElementById('hand');
// let selectElem = document.getElementById('cardpicker');
let cardCountElem = document.getElementById('card-count');
let keepElem = document.getElementById('keep-button');
let discardElem = document.getElementById('discard-button');
let resetElem = document.getElementById('reset-button');

let names = ["3 minute time bonus", "6 minute time bonus", "9 minute time bonus", "12 minute time bonus", "18 minute time bonus", "Discard 1 draw 2", "Discard 2 draw 3", "Draw 1 expand 1", "Duplicate another card", "Veto question", "Randomise question", "Move", "Curse of the Bird Guide", "Curse of the Bridge Troll", "Curse of the Cairn", "Curse of the Overflowing Chalice", "Curse of the Distant Cuisine", "Curse of the Drained Brain", "Curse of the Egg Partner", "Curse of the Endless Tumble", "Curse of the Gambler's Feet", "Curse of the Hidden Hangman", "Curse of the Impressionable Consumer", "Curse of the Jammed Door", "Curse of the Labyrinth", "Curse of the Lemon Phylactery", "Curse of the Luxury Car", "Curse of the Ransom Note", "Curse of the Right Turn", "Curse of Spotty Memory", "Curse of the Mediocre Travel Agent", "Curse of the Unguided Tourist", "Curse of the Urban Explorer", "Curse of the U-Turn", "Curse of Water Weight", "Curse of the Zoologist"];

let deck = JSON.parse(localStorage.getItem('deck'));
let hand = JSON.parse(localStorage.getItem('hand'));

if (!deck) {
    reset();
}

if (!hand) {
    hand = [];
}

cardCountElem.innerText = hand.length;

let discardCount = 0;

for (let i = 0; i < 100; i++) {
    let newImg = document.createElement("img");
    newImg.style.setProperty("--index", i.toString());
    newImg.src = `/img/hns/back.png`;
    deckElem.appendChild(newImg);
}

for (const card of hand) {
    addHand(card);

    // let newOption = document.createElement("option");
    // newOption.value = names[card];
    // newOption.textContent = names[card];
    // selectElem.appendChild(newOption);
}

function addHand(card) {
    let newImg = document.createElement("img");
    newImg.src = `/img/hns/${card}.png`;
    handElem.appendChild(newImg);

    newImg.onclick = function () {
        discardCount += newImg.classList.toggle('hand-selected') ? 1 : -1;
        discardElem.innerText = `Play/discard ${discardCount} cards`;
        discardElem.classList.toggle('disabled', discardCount === 0);
    };
}

for (let i = 0; i < 36; i++) {
    (new Image()).src = `/img/hns/${i}.png`
}

let keepCount = 0;

deckElem.onclick = function () {
    let target = deckElem.lastChild;
    target.style.setProperty("--drawing", "1000px");
    setTimeout(() => {
        target.remove()
        let card = deck.pop();

        bufferElem.parentElement.classList.remove('d-none');

        let newImg = document.createElement("img");
        newImg.src = `/img/hns/back.png`;
        newImg.style.setProperty("--real", `url(/img/hns/${card}.png)`);
        bufferElem.appendChild(newImg);

        newImg.onclick = function () {
            newImg.classList.add('flipped')

            newImg.onclick = function () {
                keepCount += newImg.classList.toggle('buffer-selected') ? 1 : -1;
                keepElem.innerText = `Keep ${keepCount} cards`;
                keepElem.classList.toggle('disabled', keepCount === 0);
            }
        }
    }, 500)
}

keepElem.onclick = function () {
    let cards = document.querySelectorAll('.buffer-selected');
    for (const cardElem of cards) {
        console.log(cardElem.style.getPropertyValue("--real"))
        console.log(parseInt(cardElem.style.getPropertyValue("--real").match("\\d+")[0]));
        let card = parseInt(cardElem.style.getPropertyValue("--real").match("\\d+")[0]);
        hand.push(card);
        addHand(card);
    }

    bufferElem.parentElement.classList.add('d-none');
    while (bufferElem.firstChild) {bufferElem.removeChild(bufferElem.lastChild)}
    keepCount = 0;
    keepElem.innerText = `Keep 0 cards`;
    keepElem.classList.add('disabled');

    cardCountElem.innerText = hand.length;

    localStorage.setItem('deck', JSON.stringify(deck));
    localStorage.setItem('hand', JSON.stringify(hand));
}

resetElem.onclick = () => {reset(); window.location.reload();}

function reset() {
    deck = [].concat(
        new Array(25).fill(0),
        new Array(15).fill(1),
        new Array(10).fill(2),
        new Array(3).fill(3),
        new Array(2).fill(4),

        new Array(4).fill(5),
        new Array(4).fill(6),
        new Array(2).fill(7),
        new Array(2).fill(8),
        new Array(4).fill(9),
        new Array(4).fill(10),
        [11],

        new Array(24).fill(-1).map((_, i) => i + 12)
    )

    shuffle(deck);

    hand = [];

    localStorage.setItem('deck', JSON.stringify(deck));
    localStorage.setItem('hand', JSON.stringify(hand));
}

function shuffle(array) { // https://bost.ocks.org/mike/shuffle/
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}