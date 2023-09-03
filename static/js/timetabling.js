Parse.initialize("viGGnxrB3M4nkQh0d3I8a35x0ybLrGB78F6GxdmU", "WNVtQaz9fVf84E5n4rTlSzQ8cALlO0VvAQ2CHN06");
Parse.serverURL = 'https://parseapi.back4app.com/';

const studentSelect = document.querySelector("#student");
const ttPlaceholder = document.querySelector("#timetable-placeholder");
const ttBody = document.querySelector("#timetable-body");
const studentClassList = document.querySelector("#classes");
const insightSelect = document.querySelector("#insight");
const insightArgumentSelect = document.querySelector("#insight-argument");
const insightOutput = document.querySelector("#insight-output");

const Student = Parse.Object.extend("Student");

let timetable;
let classes;

//region Utility Functions
function getType(ident) {
  return ident.at(2) !== "y" ? ident.at(2) :
    ident.includes("Ap") ? "PDT" :
      ident.includes("Di") ? "Discussion" : "Enrichment";
}

function resetTimetable() {
  ttBody.replaceChildren();
  for (let i = 0; i < 9; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let cell = document.createElement("td");
      cell.classList.add("border");
      row.appendChild(cell);
    }
    ttBody.appendChild(row);
  }
}

function getNextDay() {
  // let nextDay = dayNo + 1 === ((new Date().getDay() % 6) + ((new Date().getDay() % 6) === 0 || new Date().getHours() > 15 || (new Date().getHours() === 15 && new Date().getMinutes() >= 35)))
  let currentDay = new Date().getDay() % 6;
  let weekend = currentDay === 0;
  let isDayOver = weekend || new Date().getHours() > 15 || (new Date().getHours() === 15 && new Date().getMinutes() >= 35);
  return currentDay - 1 + isDayOver;
}
//endregion

let query = new Parse.Query(Student);
query.find().then(res => {
  res.forEach(student => {
    let option = new Option(student.get("firstName"), student.id);
    studentSelect.appendChild(option);
  })
})

studentSelect.onchange = () => {
  resetTimetable();
  for (const child of studentClassList.children) {
    child.innerText = "";
  }
  insightSelect.firstElementChild.selected = true;
  clearInsightOutput()
  insightArgumentSelect.classList.add("d-none");

  if (studentSelect.value === "") {
    ttPlaceholder.classList.remove("d-none");
    document.querySelectorAll(".requires-selection").forEach(e => e.classList.add("d-none"));
  } else {
    ttPlaceholder.classList.add("d-none");
    document.querySelectorAll(".requires-selection").forEach(e => e.classList.remove("d-none"));

    let query = new Parse.Query(Student);
    query.get(studentSelect.value).then(student => {
      classes = {}
      !(async () => {
        let i = 0;
        for (const classType of ["A", "B", "C", "D", "PDT", "Discussion", "Enrichment"]) {
          let classObj = await student.get(`class${classType}`).fetch()
          classes[classObj.get("ident")] = classObj;

          if (classObj.get("ident").includes("Di")) continue;

          studentClassList.children[i].textContent = classObj.get("ident");
          i++;
        }
      })().then(() => {
        timetable = JSON.parse(student.get("ttJson"));

        for (const [dayNo, day] of timetable.entries()) {
          let isNextDay = dayNo === getNextDay();

          for (const [periodNo, period] of day.entries()) {
            if (isNextDay) ttBody.children[periodNo].children[dayNo].classList.add("color-bg-attention")

            let ident = period.split(":")[0];
            let args;
            if (period.includes(":")) {
              args = period.split(":")[1].split(",");
              if (args[0] === "") {
                args[0] = 1;
              }
              if (args[1] === "" || args[1] === undefined) {
                args[1] = 1;
              }
            } else {
              args = [1, 1];
            }

            if (ident === "fr") {
              continue;
            }

            let classObj = classes[ident.replace("/Am", "/Ma")]
            ttBody.children[periodNo].children[dayNo].innerHTML = `${classObj.get("displayName")}
${ident}
${classObj.get("teacher" + args[0].toString())}
${classObj.get("room" + args[1].toString())}`;
          }
        }
      });
    });
  }
}

//region Insights
function clearInsightOutput() {
  insightOutput.innerText = "";
  insightOutput.classList.remove("color-fg-success")
  insightOutput.classList.remove("color-fg-severe");
  for (const row of ttBody.children) {
    for (const cell of row.children) {
      cell.classList.remove("color-bg-success")
      cell.classList.replace("color-bg-accent", "color-bg-attention")
    }
  }
}

insightSelect.onchange = () => {
  clearInsightOutput();
  if (insightSelect.value === "") {
    insightArgumentSelect.classList.add("d-none");
  } else {
    insightArgumentSelect.classList.remove("d-none");
    insightArgumentSelect.replaceChildren();
    switch (insightSelect.value) {
      case "periods":
        for (const child of studentSelect.children) {
          if (child.value !== studentSelect.value) {
            insightArgumentSelect.appendChild(child.cloneNode(true));
          }
        }
        break;
      case "people":
        insightArgumentSelect.appendChild(new Option("Select...", "", true));
        for (const classIdent of Object.keys(classes)) {
          insightArgumentSelect.appendChild(new Option(classIdent, classIdent));
        }
    }
  }
}

insightArgumentSelect.onchange = () => {
  clearInsightOutput()
  if (insightArgumentSelect.value === "") {
  } else {
    switch (insightSelect.value) {
      case "periods":
        query = new Parse.Query(Student);
        query.get(insightArgumentSelect.value).then(student => {
          let compareTt = JSON.parse(student.get("ttJson"));

          let matches = [];
          for (let day = 0; day < 5; day++) {
            for (let period = 0; period < 9; period++) {
              if (timetable[day][period].split(":")[0] === compareTt[day][period].split(":")[0]) {
                matches.push([day, period]);
              }
            }
          }

          if (matches.length === 0) {
            insightOutput.classList.remove("color-fg-success")
            insightOutput.classList.add("color-fg-severe");
            insightOutput.innerText = "No common periods found! This is probably an error.";
          } else {
            insightOutput.classList.add("color-fg-success")
            insightOutput.classList.remove("color-fg-severe");
            insightOutput.innerText = `Found ${matches.length} common periods!`

            matches.forEach(match => {
              let success = ttBody.children[match[1]].children[match[0]].classList.replace("color-bg-attention", "color-bg-accent")
              if (!success) {
                ttBody.children[match[1]].children[match[0]].classList.add("color-bg-success")
              }
            })
          }

        });
        break;
      case "people":
        insightOutput.classList.add("color-fg-success")
        insightOutput.classList.remove("color-fg-severe");

        let ident = insightArgumentSelect.value;
        query = new Parse.Query(Student);
        query.equalTo(`class${getType(ident)}`, classes[ident]);
        query.find().then(students => {
          for (const student of students) {
            if (student.id === studentSelect.value) continue;
            insightOutput.innerText += `${student.get("firstName")}\n`
          }

          if (insightOutput.innerText === "") {
            insightOutput.classList.remove("color-fg-success")
            insightOutput.classList.add("color-fg-severe");
            insightOutput.innerText = "No other people found!";
          }
        });
    }
  }
}
//endregion