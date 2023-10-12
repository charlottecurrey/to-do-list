// script.js

// Getting the necessary elements
const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-task");
const tasksList = document.getElementById("tasks-list");

// Functions
function addTask() {
  if (taskInput.value.trim() === "") return; // Check if input is not empty

  const li = document.createElement("li");
  li.innerHTML = `
        ${taskInput.value} 
        <button onclick="deleteTask(this)">Delete</button>
        <input type="checkbox" onclick="toggleCompleted(this)">
    `;
  tasksList.appendChild(li);
  taskInput.value = "";

  // Save tasks to local storage
  saveTasks();
}

function deleteTask(buttonElement) {
  tasksList.removeChild(buttonElement.parentElement);

  // Save tasks to local storage
  saveTasks();
}

function toggleCompleted(checkboxElement) {
  if (checkboxElement.checked) {
    checkboxElement.parentElement.classList.add("completed");
  } else {
    checkboxElement.parentElement.classList.remove("completed");
  }

  // Save tasks to local storage
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  tasksList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      completed: li.querySelector('input[type="checkbox"]').checked,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasksList.innerHTML = ""; // Clear existing tasks
  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
            ${task.text} 
            <button onclick="deleteTask(this)">Delete</button>
            <input type="checkbox" onclick="toggleCompleted(this)" ${
              task.completed ? "checked" : ""
            }>
        `;
    tasksList.appendChild(li);
  });
}

// Event Listeners
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Load tasks from local storage on page load
loadTasks();
