import {
  getLatestSearch,
  getToken,
  getUser,
  requiredLogin,
  saveSession,
} from "./utils.js";
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
let currentSorttype = "";
let currentSortby = "";

async function tasks(pageNumber, searchText = "", sorttype = "", sortby = "") {
  try {
    const res = await getTask(pageNumber, searchText, sorttype, sortby);
    if (!res.ok) {
      throw ApiError("Failed to get tasks", res.status);
    }
    const result = await res.json();

    const rawData = result.data || [];
    const taskList = rawData.map((data) => new Task(data));
    saveSession(getToken(), getUser(), {
      currentSearchText: searchText,
      currentSorttype: sorttype,
      currentSortby: sortby,
    });

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
const latestData = getLatestSearch();
await tasks(
  page,
  latestData?.currentSearchText ?? "",
  latestData?.currentSorttype ?? "",
  latestData?.currentSortby ?? "",
);

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  tasks(page, currentSearchText, currentSorttype, currentSortby);
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page--;
  tasks(page, currentSearchText, currentSorttype, currentSortby);
});

searchbar.addEventListener(
  "input",
  debounce(async (e) => {
    currentSearchText = e.target.value.trim();
    page = 1;
    await tasks(page, currentSearchText, currentSorttype, currentSortby);
  }, 300),
);

//sorting
// async function getSortedData(sorttype, sortfield) {
//   try {
//     const res = await sorting(sorttype, sortfield);
//     if (!res.ok) {
//       throw new ApiError("failed to sorted", res.status);
//     }
//     const result = await res.json();
//     const sortedtask = result.data.map((data) => new Task(data));
//     viewTask(sortedtask);
//   } catch (e) {
//     console.log(e.message, e.status);
//   }
// }

const tableHead = document.getElementById("table-head");
document.getElementById("task-id").dataset.id = "custom_id";
document.getElementById("task-name").dataset.id = "name";
document.getElementById("completion").dataset.id = "completion";
document.getElementById("end-date").dataset.id = "end";
const ascbtn = document.getElementById("asc");
ascbtn.dataset.id = "asc";
const dscbtn = document.getElementById("dsc");
dscbtn.dataset.id = "dsc";
const sortDiv = document.getElementById("sorttype");

const currentSortHighLight = [];
tableHead.addEventListener("click", async (e) => {
  e.preventDefault();
  currentSortby = e.target.dataset.id;
  if (!e.target.closest(".sortField")) {
    sortDiv.style.display = "none";
    // console.log("return form tablehead eventlistener");
    return;
  }
  // console.log("table head clicked");
  // e.target.classList.add("active");
  currentSortHighLight.push(e.target);
  const x = e.pageX;
  const y = e.pageY;
  sortDiv.style.left = `${x + 5}px`;
  sortDiv.style.top = `${y - 100}px`;

  sortDiv.style.display = "block";
});

ascbtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentSorttype = ascbtn.dataset.id;
  tasks(page, currentSearchText, currentSorttype, currentSortby);

  currentSortHighLight.forEach((Highlight) =>
    Highlight.classList.remove("active"),
  );

  currentSortHighLight[currentSortHighLight.length - 1].classList.add("active");

  sortDiv.style.display = "none";
});
dscbtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentSorttype = dscbtn.dataset.id;
  tasks(page, currentSearchText, currentSorttype, currentSortby);
  currentSortHighLight.forEach((Highlight) =>
    Highlight.classList.remove("active"),
  );

  currentSortHighLight[currentSortHighLight.length - 1].classList.add("active");

  sortDiv.style.display = "none";
});
