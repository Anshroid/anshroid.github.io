Parse.initialize("viGGnxrB3M4nkQh0d3I8a35x0ybLrGB78F6GxdmU", "WNVtQaz9fVf84E5n4rTlSzQ8cALlO0VvAQ2CHN06");
Parse.serverURL = 'https://parseapi.back4app.com/';

const user = new Parse.User();
user.set("username", "insert");

const ttHtml = document.querySelector("#input-file");
const password = document.querySelector("#password")
const submitButton = document.querySelector("#upload");

let out;
const Class = Parse.Object.extend("Class");
const Student = Parse.Object.extend("Student");

submitButton.onclick = async () => {
  try {
    user.set("password", password.value);
    await user.logIn();

    let inputFile = ttHtml.files[0];
    if (!inputFile) {
      toast("No input file provided", "error");
      return;
    }

    let contents = new TextDecoder("utf-8").decode((await inputFile.stream().getReader().read()).value);
    let parser = new DOMParser();
    let ttDocument = parser.parseFromString(contents, "text/html");

    let [name, form] = ttDocument.querySelector(".TitleBold").innerText.split(", ")[1].split(" 12");

    let toCreate = {};
    let found = {A: false, B: false, C: false, D: false, PDT: false, Discussion: false, Enrichment: false};
    let classes = {A: undefined, B: undefined, C: undefined, D: undefined, Enrichment: undefined, PDT: undefined, Discussion: undefined}

    let ttJson = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""]
    ]

    console.groupCollapsed("Parsing timetable structure...");
    for (const [index, cell] of ttDocument.querySelector("table").querySelector("table").querySelectorAll("table").entries()) {
      let ident = cell.children[0].children[1].innerText.trim()

      if (!ident) {
        ttJson[index % 5][Math.floor(index/5)] = "fr";
        continue
      }

      let args = "";


      let type = ident.at(2) !== "y" ? ident.at(2) :
        ident.includes("Ap") ? "PDT" :
          ident.includes("Di") ? "Discussion" : "Enrichment";

      let res;
      if (!toCreate[ident]) {
        if (!found[type]) {
          console.log(`Querying ${ident}`)
          let query = new Parse.Query(Class);
          query.equalTo("ident", ident);
          res = await query.first();
        } else {
          res = classes[type];
        }
      }

      found[type] = true;

      if (!res) {
        let displayName = cell.children[0].children[0].innerText.trim();
        let teacher = cell.children[0].children[2].innerText.trim();
        let room = cell.children[0].children[3].innerText.trim();

        if (!toCreate[ident]) {
          console.log(`Create new class (${ident})`);

          res = new Class();
          res.set("ident", ident)
          res.set("teacher1", teacher)
          res.set("displayName", displayName)
          res.set("room1", room)

          toCreate[ident] = res;
        } else {
          console.log(`Update new class (${ident})`);

          res = toCreate[ident];
          args += ":";

          if (res.get("teacher1") !== teacher) {
            res.set("teacher2", teacher);
            args += "2";
          }

          if (res.get("room1") !== room) {
            if (!res.get("room2") || res.get("room2") === room) {
              res.set("room2", room)
              args += ",2";
            } else {
              if (!res.get("room3") || res.get("room3") === room) {
                res.set("room3", room)
                args += ",3";
              } else {
                res.set("room4", room)
                args += ",4"
              }
            }
          }

        }
      }

      ttJson[index % 5][Math.floor(index/5)] = ident + args;
      classes[type] = res;
    }
    console.groupEnd();

    if (!Object.values(found).every(v => v)) toast("Not all subjects could be found!", "error");

    console.groupCollapsed(`${Object.values(toCreate).length} new classes will be created!`);
    console.log(toCreate);
    console.groupEnd();

    let student = new Student();
    student.set("firstName", name);
    Object.keys(classes).forEach(classType => {
      student.set(`class${classType}`, classes[classType]);
    });
    student.set("ttJson", JSON.stringify(ttJson));

    console.log("Committing operation!")
    student.save()

    toast("Done!", "success")


  } catch (e) {
    toast(e.message, "error");
    throw e;
  }
}

let existingToastTimeout;

function toast(message, type) {
  document.querySelector("#toast-content").innerText = message;
  document.querySelector("#toast").classList.add(`Toast--${type}`);
  document.querySelector("#toast").classList.remove("Toast--animateOut");
  document.querySelector("#toast").classList.add("d-none")
  document.querySelector("#toast").classList.remove("d-none")
  if (existingToastTimeout) clearTimeout(existingToastTimeout);
  existingToastTimeout = setTimeout(() => {
    document.querySelector("#toast").classList.add("Toast--animateOut")
    setTimeout(() => {
      document.querySelector("#toast").classList.remove(`Toast--${type}`);
    }, 500)
  }, 2000);
}