import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from '../../services/form-service/form';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service/api-service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  formService = inject(FormService);
  router = inject(Router);
  apiService = inject(ApiService);

  taskForm = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      is_active: new FormControl('', [Validators.required]),
      completion: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      user_id_responsible: new FormControl(null, [Validators.required]),
      start: new FormControl(''),
      end: new FormControl(''),
      'task-priority': new FormControl(''),
    },
    {
      validators: this.formService.dateValidityCheck('start', 'end'),
    },
  );

  async onSubmit() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.invalid) {
      console.log('validity failed');
      return;
    }

    try {
      await this.apiService.createTask(this.taskForm.value);
      this.formService.formStatus.set(false);
      this.taskForm.reset();
      this.router.navigate(['/tasks']);
    } catch (err) {
      const httpError = err as HttpErrorResponse;
      if (httpError.status === 422 && httpError.error?.errors) {
        this.handleServerErrors(httpError.error.errors);
      }
    }
  }

  handleServerErrors(errors: Record<string, string[]>) {
    Object.keys(errors).forEach((serverKey) => {
      const control = this.taskForm.get(serverKey);

      if (control && errors[serverKey]?.length > 0) {
        control.setErrors({ serverError: errors[serverKey][0] });
        control.markAsTouched();
      }
    });
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
    } catch (e) {
      console.log(`no user or priority`, e);
    }
  }
}
