import {
  existingTask,
  updateExistingTask,
  createTask,
  deleteTask,
} from "./api.js";
import { ApiError } from "./error.js";
import {
  fillUpForm,
  updateTaskData,
  verified,
  newTask,
} from "./formValidation.js";
import { requiredLogin } from "./auth.js";
import {
  page,
  currentSearchText,
  currentSortby,
  currentSorttype,
  tasks,
} from "./task.list.js";
import { formCancelHandler, formSubmitHandlerByEnter } from "./task.form.js";
import { type task as taskType } from "./task.model.js";

let updateMassage = document.getElementById("Task-create");
const tableBody = document.getElementById("tablebody");
const taskForm = document.getElementById("task-Form");
const formContainer = document.getElementById("form-container");
const createBtn = document.getElementById("create-task");
const taskFormContainer = document.getElementById("form-container");
const tableContainer = document.getElementById("table-container");
let originalTask: taskType | null = null;
let editingTaskId: number | null = null;

if (createBtn) {
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    requiredLogin();
    (taskFormContainer as HTMLElement).style.display = "block";
    (tableContainer as HTMLElement).classList.add("restrict");
    document.addEventListener("keydown", formCancelHandler);
    document.addEventListener("keydown", formSubmitHandlerByEnter);
  });
}

async function getTaskById(id: number) {
  try {
    const res = await existingTask(id);
    if (!res.ok) {
      throw new ApiError("Failed to get existing task", res.status);
    }
    return res.json();
  } catch (e: unknown) {
    if (e instanceof ApiError) console.log(e.message);
  }
}

if (tableBody) {
  tableBody.addEventListener("click", async (e: any) => {
    e.preventDefault();
    requiredLogin();
    const deleteBtn = e.target.classList.contains("delete-btn");

    if (deleteBtn) {
      if (!confirm("Are you sure you want\nto Delete this task")) {
        return;
      }

      try {
        const row = e.target.closest("tr");
        const id = row.dataset.id;
        const deleteResponse = await deleteTask(id);

        if (!deleteResponse.ok) {
          throw new ApiError("failed to deleted task", e.status);
        }
        row.remove();
        await tasks(page, currentSearchText, currentSorttype, currentSortby);
        (updateMassage as HTMLElement).textContent = "Task delete successfully";
      } catch (e: unknown) {
        if (e instanceof ApiError)
          (updateMassage as HTMLElement).textContent = e.message;
      } finally {
        setTimeout(() => {
          (updateMassage as HTMLElement).textContent = "";
        }, 5000);
      }
      return;
    }

    const taskId = e.target.closest("tr").dataset.id;
    const operationalTask = await getTaskById(taskId);
    originalTask = operationalTask;
    editingTaskId = taskId;
    if (originalTask) {
      fillUpForm(originalTask);
    }
    (tableContainer as HTMLElement).classList.add("restrict");
    (taskFormContainer as HTMLElement).style.display = "block";

    document.addEventListener("keydown", formCancelHandler);
    document.addEventListener("keydown", formSubmitHandlerByEnter);
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!confirm("Are you sure\nyou want to submit?")) return;
    if (!verified()) {
      return;
    }

    try {
      if (editingTaskId && originalTask) {
        const updatedFields = updateTaskData(originalTask);
        if (Object.keys(updatedFields).length === 0) {
          return;
        }
        const res = await updateExistingTask(updatedFields, editingTaskId);

        if (!res.ok) {
          throw new ApiError("Updating task failed", res.status);
        }
        await tasks(page, currentSearchText, currentSorttype, currentSortby);
        (updateMassage as HTMLElement).textContent =
          "Successfully update the task";
        return;
      } else {
        const task = newTask();
        const response = await createTask(task);
        if (!response.ok) {
          throw new ApiError("Failed to create task", response.status);
        }

        await tasks(page, currentSearchText, currentSorttype, currentSortby);
        (updateMassage as HTMLElement).textContent =
          "New task create successfully";
      }
    } catch (err: unknown) {
      if (err instanceof ApiError)
        (updateMassage as HTMLElement).textContent = err.message;
    } finally {
      (taskForm as HTMLFormElement).reset();
      (formContainer as HTMLElement).style.display = "none";
      (tableContainer as HTMLElement).classList.remove("restrict");
      document.removeEventListener("keydown", formCancelHandler);
      document.removeEventListener("keydown", formSubmitHandlerByEnter);
      editingTaskId = null;
      originalTask = null;
      setTimeout(() => {
        (updateMassage as HTMLElement).textContent = "";
      }, 5000);
    }
  });
}
