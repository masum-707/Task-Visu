import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  setInfoToLocalStorage(userInfo: any, token: any): void {
    localStorage.setItem(config.storageKey.user, JSON.stringify(userInfo));
    localStorage.setItem(config.storageKey.token, JSON.stringify(token));
  }
  getInfoFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}
