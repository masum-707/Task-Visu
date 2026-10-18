const saveBtn = document.getElementById("submit");
const tableContainer = document.getElementById("table-container");
const formContainer = document.getElementById("form-container");
const taskForm = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");

export function formCancelHandler(e: any): void {
  if (e.type === "click") {
    e.preventDefault();
  }

  if (e.type === "click" || e.key === "Escape") {
    if (!confirm("Are you sure you want to cancel?")) return;
    document.removeEventListener("keydown", formCancelHandler);
    document.removeEventListener("keydown", formSubmitHandlerByEnter);
    if (taskForm && tableContainer && formContainer) {
      (taskForm as HTMLFormElement).reset();
      (tableContainer as HTMLElement).classList.remove("restrict");
      (formContainer as HTMLElement).style.display = "none";
    }
  }
}

if (cancel) {
  cancel.addEventListener("click", formCancelHandler);
}

export function formSubmitHandlerByEnter(e: KeyboardEvent) {
  if (e.key === "Enter" && saveBtn) saveBtn.click();
}
