import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service/api-service';
import { AuthService } from '../../services/auth-service/auth-service';
import { TaskService } from '../../services/task-service/task-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  router = inject(Router);
  loginApi = inject(ApiService);
  authService = inject(AuthService);
  taskService = inject(TaskService);
  errorMessage = signal('');

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
        throw new Error('Incorrect username or password');
      }
      this.login.reset();
      this.authService.localStorage.setInfoToLocalStorage(data.user, data.token);
      this.authService.loginStatus.set(true);
      this.errorMessage.set('');
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.errorMessage.set(e?.message || 'An unknown error occurred');
      console.log(this.errorMessage);
    }
  }
}
