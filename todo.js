const input = document.getElementById("input_box");
const btn = document.getElementById("btn");
const taskCard = document.getElementById("list_container");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const buildCards = () => {
  taskCard.innerHTML = "";
  [...tasks].reverse().forEach((t, index) => {
    console.log(t.title);

    const originalIndex = tasks.length - 1 - index;

    const taskTitle = document.createElement("li");
    taskTitle.setAttribute(
      "style",
      "border: 1px solid #808080; border-radius:9px;"
    );

    const taskCompletedClass = t.isDone ? "checked" : "not_checked";
    taskTitle.setAttribute("class", taskCompletedClass);

    taskTitle.textContent = tasks.length - index + ". " + t.title;
    taskTitle.addEventListener("click", () => {
      t.isDone = !t.isDone;
      const newCompletedClass = t.isDone ? "checked" : "not_checked";
      taskTitle.setAttribute("class", newCompletedClass);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log(t, t.title, index);
    });

    const removeTask = document.createElement("span");
    removeTask.innerHTML = "&#10005";

    removeTask.addEventListener("click", () => {
      tasks.splice(originalIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      buildCards();
    });

    taskCard.append(taskTitle);
    taskTitle.append(removeTask);
  });
};

btn.addEventListener("click", () => {
  const inputTrimed = input.value.trim();
  if (inputTrimed.length < 3) {
    alert("The task is too short");
    return;
  }

  const task = {
    title: inputTrimed,
    isDone: false,
    creationDate: new Date(),
  };

  tasks.push(task);

  input.value = "";
  buildCards();

  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

buildCards();
