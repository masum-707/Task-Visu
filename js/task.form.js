import { newTask, verified } from "./formValidation.js";
import { createTask } from "./api.js";
import { ApiError } from "./error.js";
import { requiredLogin } from "./utils.js";

requiredLogin();

const tableContainer = document.getElementById("table-container");
const formContainer = document.getElementById("form-container");
const taskForm = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");

function formCancelHandler(e) {
  if (e.type === "click") {
    e.preventDefault();
  }
  if (e.type === "click" || e.key === "Escape") {
    if (!confirm("Are you sure you want to cancel?")) return;

    taskForm.reset();
    tableContainer.classList.remove("restrict");
    formContainer.style.display = "none";
  }
}

cancel.addEventListener("click", formCancelHandler);
document.addEventListener("keydown", formCancelHandler);

// taskForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   if (!(await verified())) {
//     return;
//   }

//   try {
//     if (originalTask.id !== null) {
//       const updatedFields = updateTaskData(originalTask);
//       const response = await updateExistingTask(updatedFields, originalTask.id);
//       if (!response.ok) {
//         throw new ApiError("updating task failed", response.status);
//       }
//     } else {
//       const task = newTask();

//       const response = await createTask(task);

//       if (!response.ok) {
//         throw new ApiError("Failed to create task", response.status);
//       }
//     }
//     taskForm.reset();
//     formContainer.style.display = "none";
//     tableContainer.classList.remove("restrict");
//     originalTask.id = null;
//   } catch (e) {
//     console.log(e.message, e.status);
//   }
// });
