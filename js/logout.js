const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logout clicked");
  if (confirm("Are sure you want to logout")) {
    //clear local storage
    window.location.href = "index.html";
  }
  return;
});
