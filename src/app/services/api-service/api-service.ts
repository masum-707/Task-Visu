import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../../config/config';
import { firstValueFrom } from 'rxjs';
import { LocalStorage } from '../localStorage-service/local-storage';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiService = inject(HttpClient);
  localStorageService = inject(LocalStorage);
  token = this.localStorageService.getInfoFromLocalStorage(`${config.storageKey.token}`);
  userId = this.localStorageService.getInfoFromLocalStorage(`${config.storageKey.user}`).id;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  async loginService(data: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.apiService.post(`${config.baseURL}login`, data));
      // console.log(response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getTaskService(id?: string): Promise<any> {
    try {
      const url = `${config.baseURL}task-visu/tasks`;
      if (id) {
        const task = await firstValueFrom(
          this.apiService.get(url + `/${id}`, {
            headers: this.headers,
          }),
        );
        return task;
      } else {
        const tasks = await firstValueFrom(
          this.apiService.get(url, {
            headers: this.headers,
          }),
        );
        return tasks;
      }
    } catch (e) {}
  }
}
