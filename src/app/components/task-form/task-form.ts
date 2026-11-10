import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskVerification } from '../../services/task-verification-service/task-verification';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  customValidity = inject(TaskVerification);

  taskForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      is_active: new FormControl('', [Validators.required]),
      completion: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      responsible: new FormControl(null, [Validators.required]),
      start: new FormControl(''),
      end: new FormControl(''),
      'task-priority': new FormControl(''),
    },
    {
      validators: this.customValidity.dateValidityCheck('start', 'end'),
    },
  );

  onSubmit() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
    } else {
      console.log('validity failed');
    }
  }

  async ngOnInit() {
    try {
      const data = await this.customValidity.apiService.existingUserAndTaskPriority();
      data.users.map((user: any) => {
        this.customValidity.userMap.set(user.id, user);
      });
      data.task_priorities.map((priority: any) => {
        this.customValidity.userMap.set(priority.id, priority);
      });
      console.log(data);
    } catch (e) {
      console.log(`no user or priority`, e);
    }
  }
}
