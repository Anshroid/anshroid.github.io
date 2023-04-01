let existingToastTimeout = null;
function errorToast(message) {
    document.querySelector("#error").innerText = message;
    document.querySelector("#toast").classList.remove("Toast--animateOut");
    document.querySelector("#toast").classList.add("d-none")
    document.querySelector("#toast").classList.remove("d-none")
    if (existingToastTimeout) clearTimeout(existingToastTimeout);
    existingToastTimeout = setTimeout(() => document.querySelector("#toast").classList.add("Toast--animateOut"), 2000);
}

let pieces = {'-1': "-", 2: "", 4: "", 3: "K", 6: "K", 5: "Q", 10: "Q", 7: "B", 14: "B", 11: "N", 22: "N", 13: "R", 26: "R"};
let diagonals = [[-1, -1], [-1, 1], [1, 1], [1, -1]]
let laterals = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function check(directions, piece, board, position, knight=false) {
    let count = 0;
    let files = new Set();
    let ranks = new Set();

    for (let direction of directions) {
        let nPos = position;
        nPos = [nPos[0] + direction[0], nPos[1] + direction[1]];
        while (nPos[0] >= 0 && nPos[0] <= 7 && nPos[1] >= 0 && nPos[1] <= 7) {
            let p = board[nPos[0]][nPos[1]];
            if (p !== -1) {
                if (p === piece) {
                    count++;
                    files.add(nPos[1]);
                    ranks.add(nPos[0]);
                }
                break;
            }

            if (knight) break;
            nPos = [nPos[0] + direction[0], nPos[1] + direction[1]];
        }
    }

    if (count < 2) return [false, false];

    let file = false;
    let rank = false;
    if (files.size < count) rank = true;
    if (ranks.size < count) file = true;

    if (!file && !rank) file = true;

    return [file, rank];
}

async function submit() {
    let inputFile = document.querySelector("#input-file");
    let whiteInput = document.querySelector("#white");
    let blackInput = document.querySelector("#black");

    let file = inputFile.files[0];
    if (file === undefined) {
        errorToast("No file selected!");
        return;
    }

    let whiteName = whiteInput.value;
    if (whiteName === "") {
        errorToast("No player name for the white pieces provided!");
        return;
    }

    let blackName = blackInput.value;
    if (blackName === "") {
        errorToast("No player name for the black pieces provided!");
        return;
    }

    let contents = new TextDecoder("utf-8").decode((await file.stream().getReader().read()).value);
    let lines = contents.split("\n");

    let board = [
        [26,22,14,10, 6,14,22,26],
        [ 4, 4, 4, 4, 4, 4, 4, 4],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [ 2, 2, 2, 2, 2, 2, 2, 2],
        [13,11, 7, 5, 3, 7,11,13]
    ];

    let moveText = "";
    let move = 1
    let white = true;

    let i = 0;
    for (let line of lines) {
        i++;
        if (i <= 20) continue;

        if (line === "" || line === "---") continue;

        let parts = line.split("m");
        let _from = parts[0].split("|");
        let _to = parts[1].split("|");
        let fromPiece = pieces[_from[0]];

        let addFile = false;
        let addRank = false;

        if (fromPiece === "") {
            if (_to[0] !== "-1" || _to[1].includes("e")) {
                if ((_to[1][0] === "1" || pieces[board[8 - parseInt(_from[1][1])][parseInt(_to[1][0]) -1 -1]] === "") &&
                    (_to[1][0] === "8" || pieces[board[8 - parseInt(_from[1][1])][parseInt(_to[1][0]) +1 -1]] === "")) {
                    addFile = true;
                }
            }
        } else if (fromPiece === "Q") {
            [addFile, addRank] = check(diagonals + laterals, parseInt(_from[0]), board, [8 - parseInt(_to[1][1]), parseInt(_to[1][0]) - 1])
        } else if (fromPiece === "R") {
            [addFile, addRank] = check(laterals, parseInt(_from[0]), board, [8 - parseInt(_to[1][1]), parseInt(_to[1][0]) - 1])
        } else if (fromPiece === "B") {
            [addFile, addRank] = check(diagonals, parseInt(_from[0]), board, [8 - parseInt(_to[1][1]), parseInt(_to[1][0]) - 1])
        } else if (fromPiece === "N") {
            [addFile, addRank] = check(
                [[2, 1], [1, 2], [-2, 1], [1, -2], [2, -1], [-1, 2], [-2, -1], [-1, -2]],
                parseInt(_from[0]), board, [8 - parseInt(_to[1][1]), parseInt(_to[1][0]) - 1], true)
        }

        // Play the move
        board[8 - parseInt(_to[1][1])][parseInt(_to[1][0]) - 1] = parseInt(_from[0]);
        board[8 - parseInt(_from[1][1])][parseInt(_from[1][0]) - 1] = -1;

        if (fromPiece === "K" && Math.abs(parseInt(_from[1][0]) - parseInt(_to[1][0])) === 2) {
            if (_to[1][0] === "3") {
                board[white ? 7 : 0][0] = -1;
                board[white ? 7 : 0][3] = white ? 13 : 26;
            } else {
                board[white ? 7 : 0][7] = -1;
                board[white ? 7 : 0][5] = white ? 13 : 26;
            }
        }

        if (_to[1].includes("e")) {
            board[8 - parseInt(_to[1][1])][parseInt(_to[1][0]) - 1] = -1;
        }

        if (_to[1].includes("p")) {
            board[8 - parseInt(_to[1][1])][parseInt(_to[1][0]) - 1] = parseInt(_to[1][-1]);
        }

        if (white) {
            moveText += `${move}. `;
            white = false;
        } else {
            white = true;
            move++;
        }

        // Figure out PGN move
        let toSquare = `${String.fromCharCode(parseInt(_to[1][0]) + 96)}${parseInt(_to[1][1])}`;

        let fromFile = `${String.fromCharCode(parseInt(_from[1][0]) + 96)}`;
        let fromRank = _from[1][1];
        fromPiece = `${fromPiece}${addFile ? fromFile : ""}${addRank ? fromRank : ""}`;

        let takes = _to[0] !== "-1" ? `${fromPiece === "" ? fromFile : ""}x` : "";
        if (fromPiece === "K" && Math.abs(parseInt(_from[1][0]) - parseInt(_to[1][0])) === 2) {
            moveText += `${toSquare[0] === "g" ? "O-O" : "O-O-O"} `;
            continue;
        }

        moveText += `${fromPiece}${takes}${toSquare}${_to[1].includes("p") ? "=" + pieces[parseInt(_to[1].split("p")[1])] : ""} `;
    }

    document.querySelector("#output").value = (`[Event "Casual Correspondence game"]
[Site "https://anshroid.github.io/kchess/"]
[Date "${new Date().toISOString().split("T")[0]}"]
[White "${whiteName}"]
[Black "${blackName}"]
[Result "*"]
    
${moveText}
`);
}

window.onload = function () {
    let convert = document.querySelector("#convert");
    convert.addEventListener("click", submit);

    let copy = document.querySelector("#copy");
    copy.addEventListener("click", function () {
        document.querySelector("#output").select();
        navigator.clipboard.writeText(document.querySelector("#output").value).then(() => {});
    });
}