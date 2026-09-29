import { config } from "./config.js";

export function saveSession(token, user, data = {}) {
  localStorage.setItem(config.storageKey.token, JSON.stringify(token));
  localStorage.setItem(config.storageKey.user, JSON.stringify(user));
  localStorage.setItem(config.storageKey.latestSearch, JSON.stringify(data));
}

export function getToken() {
  return JSON.parse(localStorage.getItem(config.storageKey.token));
}
export function getUser() {
  return JSON.parse(localStorage.getItem(config.storageKey.user));
}
export function getLatestSearch() {
  return JSON.parse(localStorage.getItem(config.storageKey.latestSearch));
}
export function clearSession() {
  localStorage.clear();
}

export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function requiredLogin() {
  if (!getToken() && !getUser()) {
    clearSession();
    window.location.href = "index.html";
  }
}
