import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  setInfoToLocalStorage(userInfo: any, token: any, latestSearch?: any): void {
    localStorage.setItem(config.storageKey.user, JSON.stringify(userInfo));
    localStorage.setItem(config.storageKey.token, JSON.stringify(token));
    if (latestSearch) {
      localStorage.setItem(config.storageKey.latestSearch, JSON.stringify(latestSearch));
    }
  }

  getInfoFromLocalStorage(key: string): any | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return null;
    }
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
