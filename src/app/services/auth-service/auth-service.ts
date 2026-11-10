import { inject, Injectable } from '@angular/core';
import { LocalStorage } from '../localStorage-service/local-storage';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localStorage = inject(LocalStorage);
  token = this.localStorage.getInfoFromLocalStorage(config.storageKey.token);
  userInfo = this.localStorage.getInfoFromLocalStorage(config.storageKey.user);
  loginStatus: boolean = Boolean(this.token && this.userInfo);

  setSession(userInfo: any, token: any): void {
    this.userInfo = userInfo;
    this.token = token;
    this.loginStatus = true;
    this.localStorage.setInfoToLocalStorage(userInfo, token);
  }

  logOut(): void {
    this.loginStatus = false;
    this.token = null;
    this.userInfo = null;
    this.localStorage.clearLocalStorage();
  }
}
