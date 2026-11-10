import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../../config/config';
import { firstValueFrom } from 'rxjs';
import { LocalStorage } from '../localStorage-service/local-storage';
import { task, Task } from '../../models/task.model';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiService = inject(HttpClient);
  // localStorageService = inject(LocalStorage);
  authService = inject(AuthService);

  // token = this.localStorageService.getInfoFromLocalStorage(`${config.storageKey.token}`);
  // userId = this.localStorageService.getInfoFromLocalStorage(`${config.storageKey.user}`).id;
  // loginStatus: boolean = true;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.token}`,
  });

  async loginService(data: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.apiService.post(`${config.baseURL}login`, data));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return;
    }
  }

  async getTaskService(page: number, text = '', sortType = '', sortBy = ''): Promise<any> {
    try {
      let skip = (page - 1) * config.pageSize;
      let url = `${config.baseURL}task-visu/tasks?responsible_id[]="${this.authService.userInfo.id}"&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&`;
      if (text) url += `search=${text}&`;
      if (sortType && sortBy) url += `sort_order=${sortType}&sort_by=${sortBy}&`;
      const response = await firstValueFrom(
        this.apiService.get<any>(`${url}permission=TASKVISU_SUPERADMIN`, {
          headers: this.headers,
        }),
      );
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
