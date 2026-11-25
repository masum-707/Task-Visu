import { inject, Injectable, signal } from '@angular/core';
import { task, Task } from '../../models/task.model';
import { ApiService } from '../api-service/api-service';
import { FormService } from '../form-service/form';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  formService = inject(FormService);
  router = inject(Router);
  existingTaskById = signal<any>({});

  totalTasks = signal(0);
  taskList = signal<Task<task>[]>([]);

  taskApiService = inject(ApiService);
  page = signal<number>(1);
  userid = signal('');
  text = signal<string>('');
  sortType = signal<string>('');
  sortBy = signal<string>('');

  task = signal<Partial<task>>({
    name: null,
    is_active: null,
    completion: null,
    user_id_responsible: null,
    start: null,
    end: null,
    'task-priority': null,
  });

  refresh() {
    if (this.page() !== 1 || this.text() !== '' || this.sortBy() !== '' || this.sortType() !== '') {
      this.page.set(1);
      this.text.set('');
      this.sortBy.set('');
      this.sortType.set('');
      this.getTask(this.page(), this.userid(), this.sortType(), this.sortBy());
    }
    return;
  }

  async getTask(page: number, id = '', text: string, sortType = '', sortBy = '') {
    try {
      const result$ = await this.taskApiService.getTaskService(page, id, text, sortType, sortBy);
      result$.subscribe({
        next: (data: any) => {
          this.totalTasks.set(data.total ?? 0);
          this.taskList.set(data.data.map((task: task) => new Task(task)) ?? []);
        },
      });

      // this.totalTasks.set(result.total ?? 0);
      // this.taskList.set(result.data.map((task: task) => new Task(task)) ?? []);
    } catch (error) {
      console.log(error);
    }
  }

  handleTaskAction(event: any) {
    event.preventDefault();
    const row: any = (event.target as HTMLElement).closest(`tr`);
    const index = row.sectionRowIndex;
    const taskId = this.taskList()[index].id;
    if (!row) {
      return;
    }

    const deleteBtn = (event.target as HTMLElement).closest('.delete-btn');
    if (deleteBtn) {
      if (confirm('Are you sure you want\nto Delete this task')) {
        const row = deleteBtn.closest('tr');
        this.deleteTask(taskId);
      }
      return;
    }
    this.updateTask(taskId);
  }

  deleteTask(taskId: any) {
    try {
      // this.taskApiService.deleteTask(taskId);
      console.log(`successfully delete task ,Task Id`, taskId);
    } catch (e) {
      console.log(`failed to delete task`, e);
    }
  }
  async updateTask(taskId: any) {
    this.existingTaskById.set(await this.taskApiService.existingTask(taskId));
    this.formService.createtask.set(false);
    this.task.update((task) => (task = { ...this.task(), ...this.existingTaskById() }));
    this.formService.formStatus.set(true);
    // console.log(this.task());
    // console.log(`need to update task,task Id`, taskId, this.task());
  }
}
