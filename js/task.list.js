import { getToken, getUser, requiredLogin } from "./utils.js";
import { getTask, ExistingUser } from "./api.js";
import { ApiError } from "./error.js";
import { Task } from "./task.model.js";
import { config } from "./config.js";
import { debounce } from "./utils.js";

requiredLogin();

async function getExistingUsersAndPriority() {
  try {
    const response = await ExistingUser();
    if (!response.ok) {
      throw new ApiError("failed to get existing users and task priority ");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
export const existingUserPriority = await getExistingUsersAndPriority();
// console.log(existingUserPriority.users);
// console.log("task list connected");
const tablebody = document.getElementById("tablebody");
const searchbar = document.getElementById("searchbar");

const taskContainer = document.getElementById("table-container");
const user = document.getElementById("currentUser");
user.textContent = getUser() + " Bhai";

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");
const currentPage = document.getElementById("current-page");

const totalTask = document.getElementById("total-task");

function renderRow(task) {
  const active = document.createElement("td");
  const customId = document.createElement("td");
  const taskName = document.createElement("td");
  const description = document.createElement("td");
  const responsibleName = document.createElement("td");
  const creatorName = document.createElement("td");
  const taskPriority = document.createElement("td");
  const endDate = document.createElement("td");
  const completion = document.createElement("td");
  const overDue = document.createElement("td");
  const action = document.createElement("td");
  const deletebtn = document.createElement("button");
  deletebtn.classList.add("delete-btn");
  deletebtn.textContent = "Delete";
  action.append(deletebtn);
  const tr = document.createElement("tr");

  active.textContent = task.is_active ? "✓" : "✗";

  customId.textContent = task?.custom_id ?? "-";

  taskName.textContent = task?.name ?? "-";

  description.textContent = task?.description_plain
    ? task.description_plain
    : "-";

  responsibleName.textContent = task?.responsible?.name ?? "-";

  creatorName.textContent = task?.creator?.name ?? "-";

  taskPriority.textContent = task?.task_priority?.custom_id ?? "-";

  endDate.textContent = task.displayEnd;

  completion.textContent = task.progressLabel ? task.progressLabel + "%" : "0%";
  overDue.textContent = task.isOverdue ? "YES" : "NO";

  tr.append(
    active,
    customId,
    taskName,
    description,
    responsibleName,
    creatorName,
    taskPriority,
    endDate,
    completion,
    overDue,
    action,
  );

  tr.dataset.id = task.id;
  return tr;
}

let page = 1;
let currentSearchText = "";

async function tasks(pageNumber, searchText = "") {
  try {
    const res = await getTask(pageNumber, searchText);
    if (!res.ok) {
      throw ApiError("Failed to get tasks", res.status);
    }
    const result = await res.json();

    const rawData = result.data || [];
    const taskList = rawData.map((data) => new Task(data));

    viewTask(taskList);

    const totalCount = result.total || 0;
    const maxPages = Math.ceil(totalCount / config.pageSize);

    nextBtn.disabled = pageNumber >= maxPages || maxPages <= 1;
    prevBtn.disabled = pageNumber <= 1;

    totalTask.textContent = totalCount;
    currentPage.textContent = pageNumber;

    const notask = document.querySelector(".no-Task");
    if (totalCount === 0) {
      taskContainer.innerHTML = "";
      if (notask) notask.style.display = "flex";

      if (!searchText) searchbar.disabled = true;
    } else {
      if (notask) notask.style.display = "none";
    }

    return totalCount;
  } catch (e) {
    console.log(e.message, e.status);
  }
}

export function viewTask(taskList) {
  tablebody.innerHTML = "";
  for (const task of taskList) {
    const row = renderRow(task);
    tablebody.append(row);
  }
}

await tasks(page, currentSearchText);

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  tasks(page, currentSearchText);
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page--;
  tasks(page, currentSearchText);
});

searchbar.addEventListener(
  "input",
  debounce(async (e) => {
    currentSearchText = e.target.value.trim();
    page = 1;
    await tasks(page, currentSearchText);
  }, 300),
);
