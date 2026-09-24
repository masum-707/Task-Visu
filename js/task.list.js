import { getToken, getUser } from "./utils.js";
import { getTask, ExistingUser } from "./api.js";
import { ApiError } from "./error.js";
import { Task } from "./task.model.js";
import { config } from "./config.js";
import { debounce } from "./utils.js";

if (!getToken() && !getUser()) {
  window.location.href = "index.html";
}

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

async function tasks(page) {
  try {
    const res = await getTask(getToken(), page);
    if (!res.ok) {
      throw ApiError("Failed to get tasks", res.status);
    }

    // console.log(res);
    const result = await res.json();
    // console.log(result);
    const taskList = result.data.map((data) => new Task(data));
    // console.log(taskList);
    viewTask(taskList);

    nextBtn.disabled = page >= result.total / config.pageSize;
    prevBtn.disabled = page == 1;
    totalTask.textContent = result.total;
    currentPage.textContent = page;
    return result.total;
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

const totalTasks = await tasks(page);
if (!totalTasks) {
  taskContainer.innerHTML = "";
  const notask = document.querySelector(".no-Task");
  notask.style.display = "flex";
  searchbar.disabled = "true";
}

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  tasks(page);
});
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page--;
  tasks(page);
});

// tablebody.addEventListener("click", async (e) => {
//   e.preventDefault();
//   // console.log(e.target);
//   const deleteBtn = e.target.classList.contains("delete-btn");
//   // console.log(deleteBtn);
//   if (deleteBtn) {
//     if (!confirm("Are you sure you want\nto Delete this task")) {
//       return;
//     }
//     try {
//       const row = e.target.closest("tr");
//       // console.log(row);
//       const id = row.dataset.id;
//       const deleteResponse = await deleteTask(id);
//       if (!deleteResponse.ok) {
//         throw ApiError("failed to deleted task", e.status);
//       }
//       row.remove();
//       // console.log(id);
//     } catch (e) {
//       console.log(
//         e.message,
//         e.status ?? "No status code available(Cors error)",
//       );
//       return;
//     }
//   }

//   // console.log("open task form");
// });

//search field

searchbar.addEventListener(
  "input",
  debounce((e) => {
    const text = e.target.value.trim();
    console.log(text);
  }, 3000),
);
