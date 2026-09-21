import { saveSession } from "./utils.js";

// console.log("login file connected");
const usernameError = document.getElementById("username-error-message");
const passwordError = document.getElementById("password-error-message");
const loginBtn = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");

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
    const response = await login();
    if (!response.ok) {
      throw new ApiError(
        "Wrong username or password\n Please try again",
        response.status,
      );
    }
    const result = response.json();
    saveSession(result.token, result.username);
    window.location.href = "tasks.html";
  } catch (e) {
    console.log(e.message, e.status);

    const warning = document.getElementById("wrong-user");
    warning.textContent = e.message;
    setTimeout(() => {
      warning.textContent = "";
    }, 5000);
    loginBtn.textContent = "Log in";
    loginBtn.disable = false;
    return;
  }
});
