import { existingUserPriority } from "./task.list.js";
import { formatDate } from "./utils.js";
import { task as taskType } from "./task.model.js";

const errorText = document.querySelectorAll(".errorText");
const taskName = document.getElementById("taskname");
const taskStatus = document.getElementById("ActiveStatus");
const completion = document.getElementById("completionfield");
const responsible = document.getElementById("responsible");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const descriptionPlain = document.getElementById("description_plain");
const taskPriority = document.getElementById("Task-Priority");
const userMap = new Map();
const priorityMap = new Map();

for (const user of existingUserPriority.users) {
  userMap.set(user.id, user);
  const option = document.createElement("option");
  option.value = user.id;
  option.textContent = user.name;
  (responsible as HTMLElement).append(option);
}

for (const priority of existingUserPriority.task_priorities) {
  priorityMap.set(priority.id, priority);
  const option = document.createElement("option");
  option.value = priority.id;
  option.textContent = priority.custom_id;
  (taskPriority as HTMLElement).append(option);
}

export function fillUpForm<T extends taskType>(task: T): void {
  (taskName as HTMLInputElement).value = task.name;
  (taskStatus as HTMLInputElement).value = String(task.is_active);
  (completion as HTMLInputElement).value = String(task.completion);
  (startTime as HTMLInputElement).value = String(task.start);
  (endTime as HTMLInputElement).value = String(task.end);
  (taskPriority as HTMLInputElement).value = task.task_priority_id;
  (descriptionPlain as HTMLInputElement).value = String(task.description_plain);
  (responsible as HTMLInputElement).value = task.user_id_responsible;
}

export function verified(): boolean {
  setTimeout(() => {
    errorText.forEach((e) => (e.textContent = ""));
  }, 5000);

  if (!(taskName as HTMLInputElement).value.trim()) {
    const nameError = document.getElementById("tasknameError");
    (nameError as HTMLElement).textContent = "Task name required";
    return false;
  }

  if (!(taskStatus as HTMLInputElement).value.trim()) {
    const statusError = document.getElementById("statusError");
    (statusError as HTMLElement).textContent = "Active status required";
    return false;
  }

  if (!(completion as HTMLInputElement).value.trim()) {
    const completionError = document.getElementById("completionError");
    (completionError as HTMLElement).textContent = " Task completion required";
    return false;
  }

  if (!userMap.has(Number((responsible as HTMLInputElement).value))) {
    const responsibleError = document.getElementById("responsibleError");
    (responsibleError as HTMLElement).textContent =
      "Select valid Responsible user";
    return false;
  }

  if (
    new Date((endTime as HTMLInputElement).value) <
    new Date((startTime as HTMLInputElement).value)
  ) {
    const enddateError = document.getElementById("endTime-error");
    (enddateError as HTMLElement).textContent =
      "Task should not be  end before start";
    return false;
  }

  return true;
}

export function newTask(): Partial<taskType> {
  const newTask = {
    name: (taskName as HTMLInputElement).value,
    is_active: Number((taskStatus as HTMLInputElement).value),
    completion: Number((completion as HTMLInputElement).value),
    user_id_responsible: Number((responsible as HTMLInputElement).value),
    start: formatDate((startTime as HTMLInputElement).value) || null,
    end: formatDate((endTime as HTMLInputElement).value) || null,
    description: (descriptionPlain as HTMLInputElement).value,
    task_priority_id: Number((taskPriority as HTMLInputElement).value) || null,
    task_priority:
      priorityMap.get(Number((taskPriority as HTMLInputElement).value)) || null,
  };
  return newTask;
}

export function updateTaskData(originalTask: taskType): Partial<taskType> {
  const updatedFields: Partial<taskType> = {};

  const name = (taskName as HTMLInputElement).value.trim();
  const isActive = Number((taskStatus as HTMLInputElement).value);
  const completionValue = Number((completion as HTMLInputElement).value);
  const responsibleId = Number((responsible as HTMLInputElement).value);
  const end = (endTime as HTMLInputElement).value.trim() || null;
  const start = (startTime as HTMLInputElement).value.trim() || null;
  const description =
    (descriptionPlain as HTMLInputElement).value.trim() || null;
  const priority = Number((taskPriority as HTMLInputElement).value);

  if (name !== originalTask.name) updatedFields.name = name;

  if (isActive !== originalTask.is_active) updatedFields.is_active = isActive;

  if (completionValue !== originalTask.completion)
    updatedFields.completion = completionValue;

  if (responsibleId !== originalTask.user_id_responsible)
    updatedFields.user_id_responsible = responsibleId;

  if (start !== originalTask.start) updatedFields.start = start;

  if (end !== originalTask.end) updatedFields.end = end;

  if (description !== originalTask.description_plain)
    updatedFields.description = description;

  if (priority !== originalTask.task_priority_id)
    updatedFields.task_priority_id = priority;

  return updatedFields;
}
