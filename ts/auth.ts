import { login } from "./api.js";
import { ApiError } from "./error.js";
import { config } from "@/config/config.js";

const usernameError: HTMLElement | null = document.getElementById(
  "username-error-message",
);
const passwordError: HTMLElement | null = document.getElementById(
  "password-error-message",
);
const loginBtn = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("log-out");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = (
      document.getElementById("username") as HTMLInputElement
    ).value.trim();
    const password = (
      document.getElementById("password") as HTMLInputElement
    ).value.trim();

    if (!userName) {
      (usernameError as HTMLElement).textContent = "UserName Required";
      return;
    }

    (usernameError as HTMLElement).textContent = "";

    if (!password) {
      (passwordError as HTMLElement).textContent = "Password Required";
      return;
    }

    (passwordError as HTMLElement).textContent = "";
    (loginBtn as HTMLButtonElement).disabled = true;
    (loginBtn as HTMLElement).textContent = "Signing in....";

    try {
      const response = await login(userName, password);
      if (!response.ok) {
        throw new ApiError(
          "Wrong username or password\n Please try again",
          response.status,
        );
      }
      const result = await response.json();
      saveSession(result.token, result.user.username, result.user.id);
      window.location.href = "tasks.html";
    } catch (e: unknown) {
      const warning = document.getElementById("wrong-user");
      if (!navigator.onLine) {
        (warning as HTMLElement).textContent = "No Internet Connection";
      } else {
        if (e instanceof ApiError)
          (warning as HTMLElement).textContent = e.message;
      }

      setTimeout(() => {
        (warning as HTMLElement).textContent = "";
      }, 5000);
      (loginBtn as HTMLElement).textContent = "Log in";
      (loginBtn as HTMLButtonElement).disabled = false;
      return;
    }
  });
}

export function saveSession(
  token: string | null,
  user: string | null,
  userId: number | null,
  data = {},
) {
  localStorage.setItem(config.storageKey.token, JSON.stringify(token));
  localStorage.setItem(config.storageKey.user, JSON.stringify(user));
  localStorage.setItem(config.storageKey.userId, JSON.stringify(userId));
  localStorage.setItem(config.storageKey.latestSearch, JSON.stringify(data));
}

export function getToken(): string | null {
  return localStorage.getItem(config.storageKey.token);
}
export function getUser(): string | null {
  return localStorage.getItem(config.storageKey.user);
}
export function getUserId(): number | null {
  return JSON.parse(localStorage.getItem(config.storageKey.userId) ?? "null");
}

export function getLatestSearch() {
  return JSON.parse(
    localStorage.getItem(config.storageKey.latestSearch) ?? "null",
  );
}

export function clearSession() {
  localStorage.clear();
}

export function requiredLogin() {
  if (!getToken() && !getUser() && getUserId()) {
    clearSession();
    window.location.href = "index.html";
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("Are sure you want to logout")) {
      clearSession();
      window.location.href = "index.html";
    }
    return;
  });
}
