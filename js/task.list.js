import {
  getLatestSearch,
  getToken,
  getUser,
  getUserId,
  requiredLogin,
  saveSession,
} from "./auth.js";
import { getTask, existingUser } from "./api.js";
import { ApiError } from "./error.js";
import { Task } from "./task.model.js";
import { config } from "./config.js";
import { debounce } from "./utils.js";

const refresh = document.getElementById("refresh");
const tableBody = document.getElementById("tablebody");
const searchbar = document.getElementById("searchbar");
const taskContainer = document.getElementById("table-container");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("previous-btn");
const currentPage = document.getElementById("current-page");
const totalTask = document.getElementById("total-task");
const user = document.getElementById("currentUser");
const tableHead = document.getElementById("table-head");
const ascBtn = document.getElementById("asc");
const dscBtn = document.getElementById("dsc");
const sortDiv = document.getElementById("sorttype");
const latestData = getLatestSearch();
const currentSortHighLight = [];
export let page = 1;
export let currentSearchText = "";
export let currentSorttype = "";
export let currentSortby = "";

dscBtn.dataset.id = "dsc";
ascBtn.dataset.id = "asc";
document.getElementById("task-id").dataset.id = "custom_id";
document.getElementById("task-name").dataset.id = "name";
document.getElementById("completion").dataset.id = "completion";
document.getElementById("end-date").dataset.id = "end";

user.textContent = getUser() + " Bhai";

async function getExistingUsersAndPriority() {
  try {
    const response = await existingUser();
    if (!response.ok) {
      throw new ApiError("failed to get existing users and task priority ");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
}
export const existingUserPriority = await getExistingUsersAndPriority();

function renderRow(task) {
  const tr = document.createElement("tr");
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
  const deleteBtn = document.createElement("button");

  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  action.append(deleteBtn);

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

export async function tasks(
  pageNumber,
  searchText = "",
  sorttype = "",
  sortby = "",
) {
  try {
    const res = await getTask(pageNumber, searchText, sorttype, sortby);
    if (!res.ok) {
      throw new ApiError("Failed to get tasks", res.status);
    }
    const result = await res.json();
    const rawData = result.data || [];
    const taskList = rawData.map((data) => new Task(data));
    saveSession(getToken(), getUser(), getUserId(), {
      currentSearchText: searchText,
      currentSorttype: sorttype,
      currentSortby: sortby,
    });
    requiredLogin();
    viewTask(taskList);

    const totalCount = result.total || 0;
    const maxPages = Math.ceil(totalCount / config.pageSize);

    nextBtn.disabled = pageNumber >= maxPages || maxPages <= 1;
    prevBtn.disabled = pageNumber <= 1;

    totalTask.textContent = totalCount;
    currentPage.textContent = pageNumber;

    const notask = document.querySelector(".no-Task");
    if (totalCount === 0) {
      taskContainer.style.display = "none";
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
  taskContainer.style.display = "block";
  tableBody.innerHTML = "";
  for (const task of taskList) {
    const row = renderRow(task);
    if (task.isOverdue) {
      row.classList.add("overDue");
    }
    tableBody.append(row);
  }
}

await tasks(
  page,
  latestData?.currentSearchText ?? "",
  latestData?.currentSorttype ?? "",
  latestData?.currentSortby ?? "",
);

if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    page++;
    tasks(page, currentSearchText, currentSorttype, currentSortby);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    page--;
    tasks(page, currentSearchText, currentSorttype, currentSortby);
  });
}

if (searchbar) {
  searchbar.addEventListener(
    "input",
    debounce(async (e) => {
      currentSearchText = e.target.value.trim();
      page = 1;
      await tasks(page, currentSearchText, currentSorttype, currentSortby);
    }, 300),
  );
}

if (tableHead) {
  tableHead.addEventListener("click", async (e) => {
    e.preventDefault();
    currentSortby = e.target.dataset.id;
    if (!e.target.closest(".sortField")) {
      sortDiv.style.display = "none";
      return;
    }
    currentSortHighLight.push(e.target);
    const x = e.pageX;
    const y = e.pageY;
    sortDiv.style.left = `${x + 5}px`;
    sortDiv.style.top = `${y - 100}px`;

    sortDiv.style.display = "block";
  });
}

if (ascBtn) {
  ascBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentSorttype = ascBtn.dataset.id;
    tasks(page, currentSearchText, currentSorttype, currentSortby);

    currentSortHighLight.forEach((Highlight) =>
      Highlight.classList.remove("active"),
    );

    currentSortHighLight[currentSortHighLight.length - 1].classList.add(
      "active",
    );

    sortDiv.style.display = "none";
  });
}

if (dscBtn) {
  dscBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentSorttype = dscBtn.dataset.id;
    tasks(page, currentSearchText, currentSorttype, currentSortby);
    currentSortHighLight.forEach((Highlight) =>
      Highlight.classList.remove("active"),
    );

    currentSortHighLight[currentSortHighLight.length - 1].classList.add(
      "active",
    );

    sortDiv.style.display = "none";
  });
}

if (refresh) {
  refresh.addEventListener("click", async (e) => {
    e.preventDefault();
    currentSortHighLight.forEach((Highlight) =>
      Highlight.classList.remove("active"),
    );
    await tasks(
      (page = 1),
      (currentSearchText = ""),
      (currentSorttype = ""),
      (currentSortby = ""),
    );
  });
}
