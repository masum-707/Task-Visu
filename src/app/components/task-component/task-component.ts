import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service/api-service';

@Component({
  selector: 'app-task-component',
  imports: [],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css',
})
export class TaskComponent {
  taskService = inject(ApiService);
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log(this.taskService.getTaskService('25'));
  }
}
