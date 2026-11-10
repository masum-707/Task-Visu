import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service/api-service';
import { AuthService } from '../../services/auth-service/auth-service';
import { TaskService } from '../../services/task-service/task-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginApi = inject(ApiService);
  authService = inject(AuthService);
  taskService = inject(TaskService);
  errorMessage = '';

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      return;
    }

    try {
      const data = await this.loginApi.loginService(this.login.value);
      if (!data.token) {
        throw new Error('Login failed');
      }
      const user = data.user ?? data.userInfo ?? {
        username: this.login.controls.username.value,
      };
      this.authService.setSession(user, data.token);
      this.errorMessage = '';
      this.login.reset();
      await this.taskService.getTask(1);
    } catch (e: any) {
      this.authService.loginStatus = false;
      this.errorMessage = e instanceof Error ? e.message : 'Incorrect username or password';
    }
  }
}
