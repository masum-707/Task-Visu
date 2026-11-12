import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/form-service/form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  formService = inject(FormService);
  router = inject(Router);

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
      validators: this.formService.dateValidityCheck('start', 'end'),
    },
  );

  onSubmit() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.valid) {
      this.formService.formStatus.set(false);
      this.taskForm.reset();
      console.log(this.taskForm.value);
      this.router.navigate(['/tasks']);
    } else {
      console.log('validity failed');
      return;
    }
  }

  onCancel() {
    this.formService.formStatus.set(false);
    this.taskForm.reset();
    this.router.navigate(['/tasks']);
  }

  async ngOnInit() {
    if (!this.formService.apiService.authService.loginStatus()) {
      return;
    }
    try {
      const data = await this.formService.apiService.existingUserAndTaskPriority();
      data.users.forEach((user: any) => {
        this.formService.userMap.set(user.id, user);
      });
      data.task_priorities.forEach((priority: any) => {
        this.formService.taskPriorityMap.set(priority.id, priority);
      });
      // console.log(data);
      console.log(this.formService.taskPriorityMap);
    } catch (e) {
      console.log(`no user or priority`, e);
    }
  }
}
