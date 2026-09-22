export class Task {
  constructor(data) {
    this.id = data.id;
    this.is_active = data.is_active;
    this.custom_id = data.custom_id;
    this.name = data.name;
    this.responsible = data.responsible;
    this.creator = data.creator;
    this.task_priority = data.task_priority;
    this.end = data.end;
    this.completion = data.completion;
    this.description = data.project.description;
  }
  get displayEnd() {
    if (!this.end) return "-";
    return new Date(this.end).toLocaleDateString();
  }
  get isOverdue() {
    if (this.end && this.completion < 100) {
      return true;
    }
    return false;
  }
  get progressLabel() {
    return this.completion;
  }
}
