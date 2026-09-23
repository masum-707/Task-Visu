import { existingUserPriority } from "./task.list.js";

const taskName = document.getElementById("task-name");
const taskStatus = document.getElementById("ActiveStatus");

const completion = document.getElementById("completion");

const responsible = document.getElementById("responsible");

const startTime = document.getElementById("startTime");

const endTime = document.getElementById("endTime");

const description = document.getElementById("description");

const taskPriority = document.getElementById("Task-Priority");
// console.log(existingUserPriority.users);

function convertTimeToUtc(time) {
  if (!time) return "";
  return new Date(time).toISOString();
}

const userMap = new Map();
for (const user of existingUserPriority.users) {
  userMap.set(user.id, user);
  const option = document.createElement("option");
  option.value = user.id;
  option.textContent = user.name;
  responsible.append(option);
}

const priorityMap = new Map();
for (const priority of existingUserPriority.task_priorities) {
  priorityMap.set(priority.id, priority);
  const option = document.createElement("option");
  option.value = priority.id;
  option.textContent = priority.custom_id;
  taskPriority.append(option);
}

function verified() {
  if (!taskName.value.trim()) {
    const nameError = document.getElementById("tasknameError");
    nameError.textContent = "Task name required";
    return false;
  }
  if (!taskStatus.value.trim()) {
    const statusError = document.getElementById("statusError");
    statusError.textContent = "Active status required";
    return false;
  }
  if (!completion.value.trim()) {
    const completionError = document.getElementById("completionError");
    completionError.textContent = " Task completion required";
    return false;
  }
  if (!userMap.has(Number(responsible.value))) {
    const responsibleError = document.getElementById("responsibleError");
    responsibleError.textContent = "Select valid Responsible user";
    return false;
  }
  return true;
}
export function newTask() {
  if (!verified()) return false;

  const newTask = {
    name: taskName.value,
    is_active: taskStatus.value === "true" ? true : false,
    completion: Number(completion.value),
    user_id_responsible: Number(responsible.value),

    start: convertTimeToUtc(startTime.value),
    // end: convertTimeToUtc(endTime.value),  //need to handle again
    // description_plain: description.value,
    task_priority: priorityMap.get(Number(taskPriority.value)),
  };
  return newTask;
}
