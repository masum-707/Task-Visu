interface K {
  name?: string | null;
  custom_id?: string | null;
}

export interface task {
  id: number;
  is_active: number;
  custom_id?: string | null;
  name: string;
  responsible: { name: string };
  creator: K;
  task_priority: K;
  end?: string | null;
  completion: number;
  description_plain?: string | null;
  [key: string]: any;
}

export class Task<T extends task> {
  id: number;
  is_active: number;
  custom_id: string | null;
  name: string;
  responsible: K;
  creator: K;
  task_priority: K;
  end: string | null;
  completion: number;
  description_plain: string | null;

  constructor(data: T) {
    this.id = data.id;
    this.is_active = data.is_active;
    this.custom_id = data.custom_id ?? null;
    this.name = data.name;
    this.responsible = data.responsible;
    this.creator = data.creator;
    this.task_priority = data.task_priority;
    this.end = data.end ?? null;
    this.completion = data.completion;
    this.description_plain = data.description_plain ?? null;
  }

  get isOverdue(): boolean {
    if (!this.end) return false;
    if (new Date(this.end).getTime() < Date.now() && this.completion < 100) {
      return true;
    }
    return false;
  }

  get displayEnd(): string {
    if (!this.end) return "-";
    return new Date(this.end).toLocaleDateString();
  }

  get progressLabel(): number {
    return Number(this.completion);
  }
}
