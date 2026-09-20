console.log("login file connected");
const usernameError = document.getElementById("username-error-message");
const passwordError = document.getElementById("password-error-message");
const loginBtn = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
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
  loginBtn.textContent = "Sign in....";
  try {
    //login api
  } catch (e) {}
});
