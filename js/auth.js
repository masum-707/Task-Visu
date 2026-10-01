import { login } from "./api.js";
import { ApiError } from "./error.js";
import { config } from "./config.js";

const usernameError = document.getElementById("username-error-message");
const passwordError = document.getElementById("password-error-message");
const loginBtn = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!userName) {
      usernameError.textContent = "UserName Required";
      return;
    }
    usernameError.textContent = "";
    if (!password) {
      passwordError.textContent = "Password Required";
      return;
    }
    passwordError.textContent = "";
    loginBtn.disable = true;
    loginBtn.textContent = "Signing in....";
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
    } catch (e) {
      const warning = document.getElementById("wrong-user");
      if (!navigator.onLine) {
        warning.textContent = "No Internet Connection";
      } else {
        warning.textContent = e.message;
      }

      setTimeout(() => {
        warning.textContent = "";
      }, 5000);
      loginBtn.textContent = "Log in";
      loginBtn.disable = false;
      return;
    }
  });
}

export function saveSession(token, user, userId, data = {}) {
  localStorage.setItem(config.storageKey.token, JSON.stringify(token));
  localStorage.setItem(config.storageKey.user, JSON.stringify(user));
  localStorage.setItem(config.storageKey.userId, JSON.stringify(userId));
  localStorage.setItem(config.storageKey.latestSearch, JSON.stringify(data));
}

export function getToken() {
  return JSON.parse(localStorage.getItem(config.storageKey.token));
}
export function getUser() {
  return JSON.parse(localStorage.getItem(config.storageKey.user));
}
export function getUserId() {
  return JSON.parse(localStorage.getItem(config.storageKey.userId));
}

export function getLatestSearch() {
  return JSON.parse(localStorage.getItem(config.storageKey.latestSearch));
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

const logoutBtn = document.getElementById("log-out");

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("Are sure you want to logout")) {
      //clear local storage
      clearSession();
      window.location.href = "index.html";
    }
    return;
  });
}
