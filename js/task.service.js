import { existingTask, updateExistingTask, createTask } from "./api.js";
import { ApiError } from "./error.js";
import { deleteTask } from "./api.js";
import {
  fillUpForm,
  updateTaskData,
  verified,
  newTask,
} from "./formValidation.js";
import { requiredLogin } from "./utils.js";

requiredLogin();
let updateMassage = document.getElementById("Task-create");
const tablebody = document.getElementById("tablebody");
const taskForm = document.getElementById("task-Form");
const formContainer = document.getElementById("form-container");
let originalTask = null;
let editingtaskId = null;

const createBtn = document.getElementById("create-task");
const taskFormContainer = document.getElementById("form-container");
const tableContainer = document.getElementById("table-container");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskFormContainer.style.display = "block";
  tableContainer.classList.add("restrict");

  // console.log("open task form");
});

async function getTaskById(id) {
  try {
    const res = await existingTask(id);
    if (!res.ok) {
      throw new ApiError("Failed to get existing task");
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
}

tablebody.addEventListener("click", async (e) => {
  e.preventDefault();
  // console.log(e.target);
  const deleteBtn = e.target.classList.contains("delete-btn");

  // console.log(deleteBtn);
  if (deleteBtn) {
    if (!confirm("Are you sure you want\nto Delete this task")) {
      return;
    }

    try {
      const row = e.target.closest("tr");
      // console.log(row);
      const id = row.dataset.id;
      const deleteResponse = await deleteTask(id);
      if (!deleteResponse.ok) {
        throw new ApiError("failed to deleted task", e.status);
      }
      row.remove();
      updateMassage.textContent = "Task delete successfully";
      // setTimeout(() => {
      //   updateMassage.textContent = "";
      // }, 5000);
      // return;
      // console.log(id);
    } catch (e) {
      // console.log(
      //   e.message,
      //   e.status ?? "No status code available(Cors error)",
      // );
      updateMassage.textContent = e.message;
    } finally {
      setTimeout(() => {
        updateMassage.textContent = "";
      }, 5000);
    }
  }
  const taskId = e.target.closest("tr").dataset.id;
  const operationalTask = await getTaskById(taskId);
  // const editingTaskId = originalTask.id;
  originalTask = operationalTask;
  editingtaskId = taskId;
  // console.log(editingtaskId);
  fillUpForm(originalTask);
  tableContainer.classList.add("restrict");
  taskFormContainer.style.display = "block";

  // const updatedFields = updateTaskData(originalTask);
  // return updatedFields;
  // console.log(updatedFields);
  // console.log("open task form");
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!verified()) {
    return;
  }

  try {
    if (editingtaskId) {
      // console.log("Updating existing task ID:", editingtaskId);
      const updatedFields = updateTaskData(originalTask);
      if (Object.keys(updatedFields).length === 0) {
        return;
      }
      // console.log("chenge object", updatedFields);
      const res = await updateExistingTask(updatedFields, editingtaskId);
      // console.log(response);

      if (!res.ok) {
        throw new ApiError("Updating task failed", response.status);
      }
      updateMassage.textContent = "Successfully update the task";
      return;
    } else {
      // console.log("Creating a new task");
      const task = newTask();

      const response = await createTask(task);
      if (!response.ok) {
        throw new ApiError("Failed to create task", response.status);
      }
      updateMassage.textContent = "New task create successfully";
    }
  } catch (err) {
    // console.error("Task submission failed:", err, err.message, err.status);
    updateMassage.textContent = err.message;
  } finally {
    taskForm.reset();
    formContainer.style.display = "none";
    tableContainer.classList.remove("restrict");
    editingtaskId = null;
    originalTask = null;
    setTimeout(() => {
      updateMassage.textContent = "";
    }, 5000);
  }
});
