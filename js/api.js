import { config } from "./config.js";
import { getToken } from "./utils.js";

export async function login(username, password) {
  const response = await fetch(`${config.baseURL}api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

export async function getTask(token, page) {
  let skip = (page - 1) * config.pageSize;
  const res = await fetch(
    `${config.baseURL}api/task-visu/tasks?responsible_id[]=74&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&permission=TASKVISU_SUPERADMIN`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //   console.log(await res.json());
  return res;
}
