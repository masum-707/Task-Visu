import { config } from "./config.js";

export function saveSession(token, user) {
  localStorage.setItem(config.storageKey.token, JSON.stringify(token));
  localStorage.setItem(config.storageKey.user, JSON.stringify(user));
}

export function getToken() {
  return JSON.parse(localStorage.getItem(config.storageKey.token));
}
export function getUser() {
  return JSON.parse(localStorage.getItem(config.storageKey.user));
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
