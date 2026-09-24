import { UpdateTask } from "./api.js";
import { ApiError } from "./error.js";

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

function fillupForm() {}
