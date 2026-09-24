import { existingUserPriority } from "./task.list.js";

const taskName = document.getElementById("task-name");
const taskStatus = document.getElementById("ActiveStatus");

const completion = document.getElementById("completion");

const responsible = document.getElementById("responsible");

const startTime = document.getElementById("startTime");

const endTime = document.getElementById("endTime");

const description_plain = document.getElementById("description_plain");

const taskPriority = document.getElementById("Task-Priority");
// console.log(existingUserPriority.users);

function formatDate(date) {
  if (!date) return "";
  const fdate = new Date(date).toISOString();
  return fdate.slice(0, 10);
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

export function fillUpForm(task) {
  taskName.value = task.name;
  taskStatus.value = task.is_active;
  completion.value = task.completion;
  endTime.value = task.end;
}

// console.log(priorityMap);

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

  const inputDate = new Date(startTime.value);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (inputDate < currentDate) {
    const startdateError = document.getElementById("starttime-error");
    startdateError.textContent =
      "Task start date can not less then current date";
    return false;
  }
  if (new Date(endTime.value) < new Date(startTime.value)) {
    const enddateError = document.getElementById("endTime-error");
    enddateError.textContent = "End date can not be less then start date";
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
    //valid format: 2026-10-11
    start: formatDate(startTime.value) || null,
    end: formatDate(endTime.value) || null,
    description: description_plain.value,
    task_priority_id: Number(taskPriority.value) || null,
    task_priority: priorityMap.get(Number(taskPriority.value)) || null,
  };
  return newTask;
}
