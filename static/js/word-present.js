let statusSpan = document.getElementById("status");
let connectBtn = document.getElementById("connect-button");
let sentenceDisplay = document.getElementById("sentence");

let client = new Colyseus.Client('ws://anshroid.ddns.net:7777');
let room = undefined;

console.log("client connected");

connectBtn.disabled = false;

connectBtn.addEventListener("click", function () {
    client.joinOrCreate("room", {"presenter": true}).then(_room => {
        connectBtn.disabled = true;

        console.log("joined", _room.sessionId);
        statusSpan.innerText = "Connected";

        room = _room;

        room.state.sentence.onAdd(() => {
            sentenceDisplay.innerText = room.state.sentence.join(" ");
        })
    });
});