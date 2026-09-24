import { UpdateTask } from "./api.js";
import { ApiError } from "./error.js";
import { deleteTask } from "./api.js";

const tablebody = document.getElementById("tablebody");

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
    const res = await UpdateTask(id);
    if (!res.ok) {
      throw new ApiError("Failed to get old task");
    }
    const task = await res.json();
    return task;
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
        throw ApiError("failed to deleted task", e.status);
      }
      row.remove();
      return;
      // console.log(id);
    } catch (e) {
      console.log(
        e.message,
        e.status ?? "No status code available(Cors error)",
      );
    }
  }

  // console.log("open task form");
});
