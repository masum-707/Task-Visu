import { Component, inject } from '@angular/core';
import { Sidebar } from '../../services/sidebar-service/sidebar';
import { TaskService } from '../../services/task-service/task-service';
import { ApiService } from '../../services/api-service/api-service';
import { PaginationComponent } from '../pagination-component/pagination-component';

@Component({
  selector: 'app-task-component',
  imports: [PaginationComponent],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css',
})
export class TaskComponent {
  apiService = inject(ApiService);
  Task = inject(TaskService);
  sidebarService = inject(Sidebar);

  // async ngOnInit() {
  //   const result = await this.taskService.getTaskService();
  //   if (result.length) {
  //     this.totalTasks = result.total;
  //     this.taskList = result.data.map((task: task) => new Task(task));
  //   }
  // }
}
