import { inject, Injectable } from '@angular/core';
import { task, Task } from '../../models/task.model';
import { ApiService } from '../api-service/api-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  totalTasks = 1;
  taskList: task[] = [];
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
}
