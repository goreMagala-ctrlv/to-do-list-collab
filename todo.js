const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let tasks = [];

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
    return;
  }
  const task = {
    title: inputBox.value.trim(),
    creationDate: new Date().toISOString(),
    isDone: false,
  };
  tasks.push(task);
  saveData();
  renderTasks();
  inputBox.value = "";
  console.log(task);
}
function renderTasks() {
  listContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    if (task.isDone) {
      li.classList.add("checked");
    }
    li.addEventListener("click", () => {
      task.isDone = !task.isDone;
      saveData();
      renderTasks();
      console.log(task);
    });

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveData();
      renderTasks();
      console.log("Deleted task at index:", index);
    });
    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
}

loadData();
renderTasks();
