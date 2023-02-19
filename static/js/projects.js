const overlay = document.querySelector("#overlay");

document.querySelectorAll(".dropdown-item").forEach((item) => {
    const button = item.parentElement.parentElement.parentElement.querySelector(".btn")
    button.setAttribute("data-type", button.querySelector(".dropdown-label").textContent)
    button.selectedItem = undefined;

    item.addEventListener("click", (event) => {
        event.target.classList.toggle("color-bg-accent");
        button.querySelector(".dropdown-label").textContent = event.target.textContent;

        overlay.classList.toggle("overlay-active");

        button.parentElement.open = false;

        if (button.selectedItem === event.target) {
            button.querySelector(".dropdown-label").textContent = button.getAttribute("data-type");
            setTimeout(() => {
                button.selectedItem = undefined;
                document.querySelectorAll(".project").forEach((project) => {
                    project.classList.remove("d-none")
                });

                document.querySelectorAll("#filter-box .btn").forEach((e_button) => {
                    e_button.classList.remove("disabled");
                });

                removeOverlay();
            }, 2000);
            return;
        }

        button.selectedItem?.classList.toggle("color-bg-accent");
        button.selectedItem = event.target;


        setTimeout(() => {
            document.querySelectorAll(".project").forEach((project) => {
                project.classList.add("d-none")
                for (let label of project.querySelectorAll(".Label")) {
                    if (label.textContent === event.target.textContent) {
                        project.classList.remove("d-none")
                        return;
                    }
                }
            });

            if (document.querySelectorAll(".project:not(.d-none)").length === 0) {
                document.querySelector("#no-projects").classList.remove("d-none");
            }

            document.querySelectorAll("#filter-box .btn").forEach((e_button) => {
                if (e_button !== button) {
                    e_button.classList.add("disabled");
                }
            });

            removeOverlay();
        }, 2000);
    });
})

function removeOverlay() {
    overlay.classList.toggle("anim-fade-out");
    setTimeout(() => {
        overlay.classList.toggle("overlay-active");
        overlay.classList.toggle("anim-fade-out");
    }, 1000)
}