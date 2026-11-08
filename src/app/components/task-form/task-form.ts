import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskVerification } from '../../services/task-verification';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  customValidity = inject(TaskVerification);

  taskForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      is_active: new FormControl(null, [Validators.required]),
      completion: new FormControl(null, [Validators.required]),
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
}
