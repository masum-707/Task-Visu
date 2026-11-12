import { inject, Injectable } from '@angular/core';
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

  totalTasks = 0;
  taskList: Task<task>[] = [];
  Task = inject(ApiService);
  page: number = 1;
  text = '';
  sortType = '';
  sortBy = '';

  async getTask(page: number, text = '', sortType = '', sortBy = '') {
    try {
      const result = await this.Task.getTaskService(page, text, sortType, sortBy);
      this.totalTasks = result.total ?? 0;
      this.taskList = result.data.map((task: task) => new Task(task)) ?? [];
    } catch (error) {
      console.log(error);
    }
  }

  openTaskForm(event: any) {
    const deleteBtn = event.target.classList.contains('delete-btn');
    if (deleteBtn) return;
    this.router.navigate(['/taskForm']);
    console.log(`taskForm open`, event.target);
    this.formService.formStatus.set(true);
  }
}
