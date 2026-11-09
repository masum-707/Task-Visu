import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../config/config';
import { ApiService } from '../../services/api-service/api-service';
import { LocalStorage } from '../../services/localStorage-service/local-storage';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginApi = inject(ApiService);
  localStorage = inject(LocalStorage);

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
      console.log(data);
      if (!data.token) {
        throw new Error('Login failed');
      }
      this.localStorage.setInfoToLocalStorage(data.user, data.token);
      this.loginApi.loginStatus = true;
      this.login.reset();
    } catch (e: any) {
      this.loginApi.loginStatus = false;
      console.log(e.massage);
    }
  }
}
