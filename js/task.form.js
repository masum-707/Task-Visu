const formContainer = document.getElementById("form-container");
const taskForm = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", (e) => {
  e.preventDefault();

  if (confirm("Are you sure you want to cancel")) {
    taskForm.reset();
    taskForm.hidden = "true";
  }
  return;
});
