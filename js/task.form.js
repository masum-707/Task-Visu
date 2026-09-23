import { newTask } from "./formValidation.js";
import { createTask } from "./api.js";
import { ApiError } from "./error.js";

const formContainer = document.getElementById("form-container");
const taskForm = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("Are you sure you want to cancel")) {
    taskForm.reset();
    formContainer.style.display = "none";
  }
  return;
});
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!newTask()) return;
  try {
    const task = newTask();
    console.log(task);
    const response = await createTask(task);
    if (!response.ok) {
      throw new ApiError("failed to create task", response.status);
    }
  } catch (e) {
    console.log(e.message, e.status);
    return;
  }
  // taskForm.reset();
});
