// global rules by local storage

let section = document.querySelector("section");
let input = document.querySelector('input[type="text"]');
let addBtn = document.querySelector("button.add");

let nb = window.localStorage.getItem("id");

if (window.localStorage.length > 1) {
  for (let i = 0; i <= window.localStorage.length; i++) {
    let taskCheck = undefined;
    let taskValue = undefined;
    if (window.localStorage.key(i) != null) {
      if (window.localStorage.key(i).length === 6) {
        taskValue = window.localStorage.key(i);
        taskCheck = window.localStorage.getItem(`${taskValue}-check`);
      }
    }
    if (taskCheck !== undefined && taskValue !== undefined) {
      // div
      let container = document.createElement("div");
      container.setAttribute("id", taskValue);

      // span
      let span = document.createElement("span");
      if (taskCheck === "yes") {
        span.classList.add("check");
      }
      // checkbox button event
      span.onclick = function () {
        span.classList.toggle("check");
        if (span.className === "check") {
          window.localStorage.setItem(`${taskValue}-check`, "yes");
        } else {
          window.localStorage.setItem(`${taskValue}-check`, "no");
        }
      };

      // label
      let label = document.createElement("label");
      let labelText = document.createTextNode(
        window.localStorage.getItem(taskValue)
      );
      label.appendChild(labelText);

      // remove the task
      let btn = document.createElement("button");
      btn.className = "delete";
      btn.onclick = function () {
        this.parentElement.remove();
        window.localStorage.removeItem(this.getAttribute("data-task"));
        window.localStorage.removeItem(
          `${this.getAttribute("data-task")}-check`
        );
      };
      btn.setAttribute("data-task", container.id);

      // add all in section
      container.appendChild(span);
      container.appendChild(label);
      container.appendChild(btn);
      section.appendChild(container);
      input.value = "";
    }
  }
} else {
  window.localStorage.clear();
  window.localStorage.setItem("id", 0);
  nb = window.localStorage.getItem("id");
  section.innerHTML = "";
}

// --------------------------------------------------------------

// add button
let addTask = function () {
  if (input.value !== "") {
    // set the task in local storage
    window.localStorage.setItem("id", ++nb);
    window.localStorage.setItem(`task-${nb}`, input.value);
    window.localStorage.setItem(`task-${nb}-check`, "no");
    //--------------------------------------------
    // div
    let container = document.createElement("div");
    container.setAttribute("id", `task-${nb}`);

    // span
    let span = document.createElement("span");
    // checkbox button event
    span.onclick = function () {
      span.classList.toggle("check");
      if (span.className === "check") {
        window.localStorage.setItem(`${this.parentElement.id}-check`, "yes");
      } else {
        window.localStorage.setItem(`${this.parentElement.id}-check`, "no");
      }
    };

    // label
    let label = document.createElement("label");
    let labelText = document.createTextNode(input.value);
    label.appendChild(labelText);

    // remove the task
    let btn = document.createElement("button");
    btn.className = "delete";
    btn.onclick = function () {
      this.parentElement.remove();
      window.localStorage.removeItem(this.getAttribute("data-task"));
      window.localStorage.removeItem(`${this.getAttribute("data-task")}-check`);
    };
    btn.setAttribute("data-task", container.id);
    container.appendChild(span);
    container.appendChild(label);
    container.appendChild(btn);
    section.appendChild(container);
    input.value = "";
  }
};

addBtn.onclick = addTask;
document.body.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addBtn.click()
  }
})
// --------------------------------------------------------------

// clear button
let clear = document.querySelector("button.clear");

clear.onclick = function () {
  section.innerHTML = "";
  window.localStorage.clear();
  window.localStorage.setItem("id", 0);
  nb = window.localStorage.getItem("id");
};
