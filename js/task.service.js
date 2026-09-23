const createBtn = document.getElementById("create-task");
const taskFormContainer = document.getElementById("form-container");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskFormContainer.style.display = "block";
  // console.log("open task form");
  
});
