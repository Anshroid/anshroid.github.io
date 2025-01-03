let statusSpan = document.getElementById("status");
let connectBtn = document.getElementById("connect-button");

let wordInput = document.getElementById("word");
let submitBtn = document.getElementById("submit-button");

let client = new Colyseus.Client('wss://anshroid.ddns.net:7777');
let room = undefined;
let ourIndex = -1;
let distance = Infinity;

console.log("client connected");

connectBtn.disabled = false;
wordInput.disabled = true;
submitBtn.disabled = true;

connectBtn.addEventListener("click", function () {
    client.joinOrCreate("room").then(_room => {
        connectBtn.disabled = true;
        wordInput.disabled = false;

        console.log("joined", _room.sessionId);
        room = _room;

        room.state.players.onAdd(() => {
            ourIndex = room.state.players.indexOf(room.sessionId);
            console.log(`Now at ${ourIndex}`);
            updateDistance(room.state.turn);
        });

        room.state.players.onRemove(() => {
            ourIndex = room.state.players.indexOf(room.sessionId);
            console.log(`Now at ${ourIndex}`);
            updateDistance(room.state.turn);
        });

        room.state.sentence.onAdd(() => {
            updateDistance(room.state.turn);
        });

        let submit = () => {
            room.send("submit", {word: wordInput.value});
        };

        submitBtn.addEventListener("click", submit);
        wordInput.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                submit();
            }
        });
    });
});

function updateDistance(turn) {
    distance = ((ourIndex - turn) + room.state.players.length) % room.state.players.length;
    statusSpan.innerText = distance > 0 ? `Your turn in ${distance}` : `Your turn! Previous words: ${room.state.sentence.toArray().slice(-2).join(" ")}`;

    submitBtn.disabled = (distance !== 0) || wordInput.value.length === 0 || wordInput.value.includes(" ");
}

wordInput.addEventListener("input", () => {
    submitBtn.disabled = (distance !== 0) || wordInput.value.length === 0 || wordInput.value.includes(" ");
});