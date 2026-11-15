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

  totalTasks = signal(0);
  taskList = signal<Task<task>[]>([]);

  taskApiService = inject(ApiService);
  page = signal<number>(1);
  text = signal<string>('');
  sortType = signal<string>('');
  sortBy = signal<string>('');

  async getTask(page: number, text: string, sortType = '', sortBy = '') {
    try {
      const result = await this.taskApiService.getTaskService(page, text, sortType, sortBy);
      this.totalTasks.set(result.total ?? 0);
      this.taskList.set(result.data.map((task: task) => new Task(task)) ?? []);
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
  updateTask(taskId: any) {
    this.formService.formStatus.set(true);
    console.log(`need to update task,task Id`, taskId);
  }
}
