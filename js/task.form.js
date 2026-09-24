import { newTask } from "./formValidation.js";
import { createTask } from "./api.js";
import { ApiError } from "./error.js";

const tableContainer = document.getElementById("table-container");
const formContainer = document.getElementById("form-container");
const taskForm = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("Are you sure you want to cancel")) {
    taskForm.reset();
    tableContainer.classList.remove("restrict");
    formContainer.style.display = "none";
  }
  return;
});
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!newTask()) return;
  if (!confirm("Are you sure\nYou want to submit task")) return;
  try {
    const task = newTask();
    // console.log(task);
    const response = await createTask(task);
    if (!response.ok) {
      throw new ApiError("failed to create task", response.status);
    }
  } catch (e) {
    console.log(e.message, e.status);
    // console.log(e);
    return;
  }
  taskForm.reset();
  formContainer.style.display = "none";
  tableContainer.classList.remove("restrict");
  const successful = document.getElementById("Task-create");
  successful.textContent = "New task create Successfully";
  setTimeout(() => (successful.textContent = ""), 3000);
});
