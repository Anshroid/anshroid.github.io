const boards = JSON.parse('[{"name":"AQA","subjects":[{"name":"DT","exams":[{"name":"Paper 1","date":[3,0],"am":true,"time":"2h30m"},{"name":"Paper 2","date":[4,1],"am":true,"time":"1h30m"}]},{"name":"German","exams":[{"name":"Language","date":[1,1],"am":true,"time":"2h30m"},{"name":"Literature","date":[4,0],"am":true,"time":"2h"}]},{"name":"Philosophy","exams":[{"name":"Epistemology","date":[0,1],"am":true,"time":"3h"},{"name":"Metaphysics","date":[1,1],"am":true,"time":"3h"}]},{"name":"Chemistry","exams":[{"name":"Inorganic","date":[4,1],"am":true,"time":"2h"},{"name":"Organic","date":[5,0],"am":true,"time":"2h"},{"name":"Paper 3","date":[5,4],"am":true,"time":"2h"}]},{"name":"Biology","exams":[{"name":"Paper 1","date":[3,3],"am":false,"time":"2h"},{"name":"Paper 2","date":[4,4],"am":true,"time":"2h"},{"name":"Paper 3","date":[5,2],"am":true,"time":"2h"}]},{"name":"Computer Science","exams":[{"name":"Paper 1","date":[4,2],"am":true,"time":"1h45m"},{"name":"Paper 2","date":[5,2],"am":true,"time":"1h30m"}]},{"name":"English","exams":[{"name":"Love","date":[0,2],"am":false,"time":"3h"},{"name":"WW1 and its aftermath","date":[1,3],"am":true,"time":"2h30m"}]},{"name":"Sociology","exams":[{"name":"Theory and Methods","date":[1,0],"am":true,"time":"2h"},{"name":"Topics in Sociology","date":[3,2],"am":true,"time":"2h"},{"name":"Crime and Deviance","date":[4,4],"am":false,"time":"2h"}]},{"name":"Politics","exams":[{"name":"UK Politics","date":[1,1],"am":false,"time":"2h"},{"name":"US Politics","date":[3,3],"am":false,"time":"2h"},{"name":"Political Ideas","date":[4,1],"am":true,"time":"2h"}]}]},{"name":"OCR","subjects":[{"name":"Physics","exams":[{"name":"Modelling","date":[1,4],"am":true,"time":"2h15m"},{"name":"Exploring","date":[4,0],"am":true,"time":"2h15m"},{"name":"Unifying","date":[5,1],"am":true,"time":"1h30m"}]},{"name":"Latin","exams":[{"name":"Translation","date":[1,1],"am":false,"time":"1h45m"},{"name":"Comprehension","date":[3,0],"am":true,"time":"1h15m"},{"name":"Prose","date":[4,0],"am":false,"time":"2h"},{"name":"Verse","date":[5,0],"am":false,"time":"2h"}]},{"name":"English","exams":[{"name":"Drama and Poetry","date":[0,2],"am":false,"time":"2h30m"},{"name":"Comparative and Contextual","date":[1,3],"am":true,"time":"2h30m"}]}]},{"name":"Edexcel","subjects":[{"name":"Maths","exams":[{"name":"Pure 1","date":[3,2],"am":false,"time":"2h"},{"name":"Pure 2","date":[4,3],"am":false,"time":"2h"},{"name":"Applied","date":[5,3],"time":"2h"}]},{"name":"Further Maths","exams":[{"name":"CP1","date":[1,1],"am":false,"time":"1h30m"},{"name":"CP2","date":[1,3],"am":false,"time":"1h30m"},{"name":"FM1","date":[3,4],"am":false,"time":"1h30m"},{"name":"FS1","date":[4,4],"am":false,"time":"1h30m"}]},{"name":"Economics","exams":[{"name":"Paper 1","date":[0,0],"am":true,"time":"2h"},{"name":"Paper 2","date":[1,0],"am":false,"time":"2h"},{"name":"Paper 3","date":[3,3],"am":true,"time":"2h"}]}]},{"name":"Eduqas","subjects":[{"name":"English","exams":[{"name":"Paper 1","date":[0,2],"am":false,"time":"2h"},{"name":"Paper 2","date":[1,3],"am":true,"time":"2h"},{"name":"Paper 3","date":[4,2],"am":true,"time":"2h"}]}]},{"name":"Other","subjects":[{"name":"STEP","exams":[{"name":"II","date":[4,2],"am":true,"time":"3h"},{"name":"III","date":[5,0],"am":true,"time":"3h"}]}]}]');

// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
};

const ttBody = document.querySelector("#timetable-body");

function toggle(exams, boardName, subjectName) {
    let id = `${boardName}-${subjectName}`.toLowerCase().replaceAll(" ", "");
    console.log(`toggled ${id}`);

    let toRemove = document.querySelectorAll(`.${id}`);
    if (toRemove.length > 0) {
        toRemove.forEach(el => {
            if (el.parentNode.childElementCount === 2) el.parentNode.hidden = true;
            el.remove();
        });
        storageSelected = storageSelected.filter(v => v !== id);
        window.localStorage.setItem("exams-selected", JSON.stringify(storageSelected));
        return;
    }

    storageSelected.push(id);
    window.localStorage.setItem("exams-selected", JSON.stringify(storageSelected));
    exams.forEach(exam => {
        let el = document.createElement("p");
        el.classList.add(id);
        el.append(`${boardName === "Other" ? "" : boardName} ${subjectName} ${exam.name} (${exam.time})`.trimStart());
        let box = ttBody.children[exam.date[0]].children[exam.date[1]].children[+!exam.am];
        box.hidden = false;
        box.appendChild(el);
    });
}

if (window.localStorage.getItem("exams-selected") == null) window.localStorage.setItem("exams-selected", "[]");
let storageSelected = JSON.parse(window.localStorage.getItem("exams-selected"));

let date = new Date();
for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        cell.classList.add("border");

        if (i < date.getWeek() - 20) {
            cell.classList.add("color-bg-success");
        } else if (i === date.getWeek() - 20) {
            if (j < (date.getDay() + 6) % 7) {
                cell.classList.add("color-bg-success");
            } else if ((date.getDay() + 6) % 7 === j) {
                cell.classList.add("color-bg-attention");
            }
        }

        row.setAttribute("data-i", i.toString());

        cell.style.height = "80px";
        row.appendChild(cell);

        let am = cell.appendChild(document.createElement("div"));
        let pm = cell.appendChild(document.createElement("div"));

        am.classList.add("border", "rounded-lg", "m-2");
        am.hidden = true;
        am.appendChild(document.createElement("h5")).append("AM");

        pm.classList.add("border", "rounded-lg", "m-2");
        pm.hidden = true;
        pm.appendChild(document.createElement("h5")).append("PM");
    }
    ttBody.appendChild(row);
}

boards.forEach(board => {
    board.subjects.forEach(subject => {
        let id = `${board.name}-${subject.name}`.toLowerCase().replaceAll(" ", "");

        let div = document.createElement("div");
        div.classList.add("form-checkbox", "m-1");

        let label = document.createElement("label");
        label.append(subject.name);
        let input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("data-subject-id", id);

        if (storageSelected.includes(id)) {
            input.checked = true;
            toggle(subject.exams, board.name, subject.name);
        }

        input.addEventListener("change", () => toggle(subject.exams, board.name, subject.name));

        label.appendChild(input);
        div.appendChild(label);
        document.querySelector(`#${board.name}`).appendChild(div);

    });
});

document.querySelector("#clear-btn").onclick = () => {
    document.querySelectorAll("input[type=checkbox]").forEach(el => el.checked = false);
    document.querySelectorAll("td > div > :not(:nth-child(1))").forEach(el => el.remove());
    document.querySelectorAll("td > div").forEach(el => el.hidden = true);

    storageSelected = [];
    window.localStorage.setItem("exams-selected", JSON.stringify(storageSelected));
};
