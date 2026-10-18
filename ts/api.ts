import { config } from "@/config/config.js";
import { clearSession, getToken, getUserId } from "./auth.js";
import { type task as taskType } from "./task.model.js";

export async function login(
  username: string,
  password: string,
): Promise<Response> {
  const response = await fetch(`${config.baseURL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

export async function getTask(
  page: number,
  text = "",
  sorttype = "",
  sortby = "",
): Promise<Response> {
  let skip = (page - 1) * config.pageSize;
  let url = `${config.baseURL}task-visu/tasks?responsible_id[]=${getUserId()}&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&`;
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

export async function deleteTask(id: number): Promise<Response> {
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

export async function createTask(task: Partial<taskType>): Promise<Response> {
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

export async function existingUser(): Promise<Response> {
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

export async function existingTask(id: number): Promise<Response> {
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

export async function updateExistingTask(
  updateTask: Partial<taskType>,
  id: number,
): Promise<Response> {
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
