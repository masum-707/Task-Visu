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
  loginStatus: boolean = false;
  authenticate: boolean = false;
  loginApi = inject(ApiService);
  localStorage = inject(LocalStorage);

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  async onSubmit() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      this.authenticate = false;
      return;
    }
    const data = await this.loginApi.loginService(this.login.value);
    console.log(data);
    if (!data.token) {
      this.authenticate = false;
      return;
    }
    this.authenticate = true;
    this.localStorage.setInfoToLocalStorage(data.user, data.token);
    this.loginStatus = true;
    this.login.reset();
  }
}
