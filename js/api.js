import { config } from "./config.js";
import { clearSession, getToken } from "./auth.js";

export async function login(username, password) {
  const response = await fetch(`${config.baseURL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

export async function getTask(page, text = "", sorttype = "", sortby = "") {
  let skip = (page - 1) * config.pageSize;
  let url = `${config.baseURL}task-visu/tasks?responsible_id[]=74&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&`;
  if (text) url += `search=${text}&`;
  if (sorttype && sortby) url += `sort_order=${sorttype}&sort_by=${sortby}&`;

  const res = await fetch(`${url}permission=TASKVISU_SUPERADMIN`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return res;
}

export async function deleteTask(id) {
  const response = await fetch(`${config.baseURL}task-visu/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (response.status == 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return response;
}

export async function createTask(task) {
  const response = await fetch(`${config.baseURL}task-visu/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });
  if (response.status == 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return response;
}

//existing user for form
export async function ExistingUser() {
  const response = await fetch(
    `${config.baseURL}task-visu/tasks/populated?expand[]=Users&expand[]=TaskPriority`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  if (response.status == 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return response;
}

//Updating task
export async function existingTask(id) {
  const response = await fetch(`${config.baseURL}task-visu/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (response.status == 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return response;
}

export async function updateExistingTask(updateTask, id) {
  const response = await fetch(`${config.baseURL}task-visu/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updateTask),
  });
  if (response.status == 401) {
    clearSession();
    window.location.href = "index.html";
  }
  return response;
}
