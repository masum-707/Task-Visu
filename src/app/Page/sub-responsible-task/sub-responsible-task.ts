import { Component, inject } from '@angular/core';
import { TaskComponent } from '../../components/task-component/task-component';
import { AuthService } from '../../services/auth-service/auth-service';
import { TaskService } from '../../services/task-service/task-service';


@Component({
  selector: 'app-sub-responsible-task',
  imports: [TaskComponent],
  templateUrl: './sub-responsible-task.html',
  styleUrl: './sub-responsible-task.css',
})
export class SubResponsibleTask {

  authService = inject(AuthService);
  taskService = inject(TaskService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.taskService.userid.set(this.authService.userInfo.id);
    this.authService.subResponsible.set(true);
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
    this.authService.subResponsible.set(false);
  }
}
