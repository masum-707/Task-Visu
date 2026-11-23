import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';
import { TaskService } from '../../services/task-service/task-service';
import { Sidebar } from '../../services/sidebar-service/sidebar';
import { AuthService } from '../../services/auth-service/auth-service';
import { TaskComponent } from '../../components/task-component/task-component';

@Component({
  selector: 'app-all-task',
  imports: [TaskComponent],
  templateUrl: './all-task.html',
  styleUrl: './all-task.css',
})
export class AllTask {
  apiService = inject(ApiService);
  taskService = inject(TaskService);
  sidebarService = inject(Sidebar);
  authService = inject(AuthService);

  // async ngOnInit() {
  //   const result = await this.taskService.getTaskService();
  //   if (result.length) {
  //     this.totalTasks = result.total;
  //     this.taskList = result.data.map((task: task) => new Task(task));
  //   }
  // }

  ngOnInit(): void {
    this.taskService.userid.set('');
    this.taskService.getTask(
      this.taskService.page(),
      this.taskService.userid(),
      this.taskService.text(),
      this.taskService.sortType(),
      this.taskService.sortBy(),
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.taskService.page.set(1);
    this.taskService.sortBy.set('');
    this.taskService.sortType.set('');
    this.taskService.text.set('');
    this.taskService.taskList.set([]);
    console.log('All task component destroy');
  }

}
