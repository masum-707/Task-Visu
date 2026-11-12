import { Component, inject } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { FormService } from '../../services/form-service/form';

@Component({
  selector: 'app-create-task',
  imports: [TaskForm],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  taskForm = inject(FormService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.taskForm.formStatus.set(true);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.taskForm.formStatus.set(false);
  }
}
