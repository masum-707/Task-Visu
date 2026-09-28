import { config } from "./config.js";
import { clearSession, getToken } from "./utils.js";

export async function login(username, password) {
  const response = await fetch(`${config.baseURL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

export async function getTask(page, text = "") {
  let skip = (page - 1) * config.pageSize;
  let res;
  if (!text) {
    res = await fetch(
      `${config.baseURL}task-visu/tasks?responsible_id[]=74&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&permission=TASKVISU_SUPERADMIN`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
  } else {
    res = await fetch(
      `${config.baseURL}task-visu/tasks?responsible_id[]=74&is_active=true&completion_lt=100&search=${text}&top=${config.pageSize}&skip=${skip}&permission=TASKVISU_SUPERADMIN`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
  }
  if (res.status === 401) {
    // console.log("token expire ,login again");
    clearSession();
    window.location.href = "index.html";
  }
  //   console.log(await res.json());
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
  // console.log(await response.json());
  return response;
}

// const newTask = {
//   name: "create test new test",
//   is_active: true,
//   completion: 0,
//   user_id_responsible: 7,
// };
// createTask(newTask);
// deleteTask("3200");

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
  // const result = await response.json();
  // console.log(result);
}
// ExistingUser();

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
  // console.log(updateTask);

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
  // console.log(response);
  return response;
}
