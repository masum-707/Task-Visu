import { getToken, getUser } from "./utils.js";
import { getTask } from "./api.js";
import { ApiError } from "./error.js";

if (!getToken() && !getUser()) {
  window.location.href = "index.html";
}
// console.log("task list connected");
const user = document.getElementById("currentUser");
user.textContent = getUser();

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");
const currentPage = document.getElementById("current-page");

const totalTask = document.getElementById("total-task");

let page = 1;

async function tasks(page) {
  try {
    const res = await getTask(getToken(), page);
    if (!res.ok) {
      throw ApiError("Failed to get tasks", res.status);
    }
    const data = await res.json();
    // console.log(data.data);
    viewTask(data.data);

    nextBtn.disabled = page == data.total;
    prevBtn.disabled = page == 1;
    totalTask.textContent = data.total;
    currentPage.textContent = page;
  } catch (e) {
    console.log(e.message, e.status);
  }
}

function viewTask(tasks) {
  const tableData = document.getElementById("tablebody");
  tableData.innerHTML = "";

  for (const task of tasks) {
    const active = document.createElement("td");
    const customId = document.createElement("td");
    const taskName = document.createElement("td");
    const responsibleName = document.createElement("td");
    const creatorName = document.createElement("td");
    const taskPriority = document.createElement("td");
    const endDate = document.createElement("td");
    const completion = document.createElement("td");
    const action = document.createElement("td");
    const deletebtn = document.createElement("button");
    deletebtn.classList.add("delete-btn");
    deletebtn.textContent = "Delete";
    action.append(deletebtn);
    const tr = document.createElement("tr");

    active.textContent = task.is_active ? "✓" : "✗";

    customId.textContent = task?.custom_id ?? "-";

    taskName.textContent = task?.name ?? "-";

    responsibleName.textContent = task?.responsible?.name ?? "-";

    creatorName.textContent = task?.creator?.name ?? "-";

    taskPriority.textContent = task?.task_priority?.custom_id ?? "-";

    endDate.textContent = task?.end ?? "-";

    completion.textContent = task?.completion ?? "-";

    tr.appendChild(active);
    tr.appendChild(customId);
    tr.appendChild(taskName);
    tr.appendChild(responsibleName);
    tr.appendChild(creatorName);
    tr.appendChild(taskPriority);
    tr.appendChild(endDate);
    tr.appendChild(completion);
    tr.appendChild(action);
    tr.addEventListener("dblclick", (e) => {
      e.preventDefault();
      if (e.target.closest("delete-btn")) return;

      console.log("open task form");
    });

    tableData.appendChild(tr);
  }
}

tasks(1);
