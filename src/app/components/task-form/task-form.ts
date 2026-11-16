import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from '../../services/form-service/form';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service/api-service';
import { TaskService } from '../../services/task-service/task-service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  formService = inject(FormService);
  router = inject(Router);
  apiService = inject(ApiService);
  taskService = inject(TaskService);

  taskForm = new FormGroup(
    {
      name: new FormControl(this.taskService.task().name, [Validators.required]),
      is_active: new FormControl(this.taskService.task().is_active, [Validators.required]),
      completion: new FormControl(this.taskService.task().completion, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      user_id_responsible: new FormControl(this.taskService.task()['user_id_responsible'] ?? null, [
        Validators.required,
      ]),
      start: new FormControl(this.taskService.task().start),
      end: new FormControl(this.taskService.task().end),
      task_priority_id: new FormControl(this.taskService.task()['task_priority_id'] ?? null),
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

  constructor() {
    effect(() => {
      if (
        this.formService.apiService.authService.loginStatus() &&
        this.formService.userMap().size == 0 &&
        this.formService.taskPriorityMap().size === 0
      ) {
        void this.loadUsersAndTaskPriorities();
      }
    });

    effect(() => {
      const currentTask = this.taskService.task();
      if (currentTask && !this.formService.createtask()) {
        this.taskForm.patchValue(currentTask);
      } else {
        this.taskForm.reset();
      }
    });
  }

  async loadUsersAndTaskPriorities() {
    try {
      const data = await this.formService.apiService.existingUserAndTaskPriority();
      const users = new Map<number, any>();
      const taskPriorities = new Map<number, any>();

      data.users.forEach((user: any) => users.set(user.id, user));
      data.task_priorities.forEach((priority: any) => taskPriorities.set(priority.id, priority));

      this.formService.userMap.set(users);
      this.formService.taskPriorityMap.set(taskPriorities);
    } catch (e) {
      console.log(`no user or priority`, e);
    }
  }
}
