import { clearSession } from "/js/utils.js";

const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logout clicked");
  if (confirm("Are sure you want to logout")) {
    //clear local storage
    clearSession();
    window.location.href = "index.html";
  }
  return;
});
