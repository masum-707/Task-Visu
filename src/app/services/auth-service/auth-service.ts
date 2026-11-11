import { inject, Injectable, signal } from '@angular/core';
import { LocalStorage } from '../localStorage-service/local-storage';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localStorage = inject(LocalStorage);
  token = this.localStorage.getInfoFromLocalStorage(config.storageKey.token);
  userInfo = this.localStorage.getInfoFromLocalStorage(config.storageKey.user);
  loginStatus = signal<boolean>(false);

  logOut(): void {
    this.loginStatus.set(false);
    this.localStorage.clearLocalStorage();
  }
}
