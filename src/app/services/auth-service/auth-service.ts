import { inject, Injectable } from '@angular/core';
import { LocalStorage } from '../localStorage-service/local-storage';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localStorage = inject(LocalStorage);
  loginStatus: boolean = true;
  token = this.localStorage.getInfoFromLocalStorage(config.storageKey.token);
  userInfo = this.localStorage.getInfoFromLocalStorage(config.storageKey.user);

  logOut(): void {
    this.loginStatus = false;
    this.localStorage.clearLocalStorage();
  }
}
