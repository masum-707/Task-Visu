interface taskModel {
  id: number;
  name: string;
  is_active: number;
  custom_id?: string | null;
  responsible: { name: string };
  creator: { name: string };
  task_priority?: { custom_id: string | null };
  end?: string | null;
  start?: string | null;
  completion: number;
  description_plain?: string | null;
  //   [key: string]: any;
}
