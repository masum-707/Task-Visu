import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { config } from '../../config/config';
import { firstValueFrom } from 'rxjs';
import { task } from '../../models/task.model';
import { AuthService } from '../auth-service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiService = inject(HttpClient);
  authService = inject(AuthService);
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.token}`,
  });

  async loginService(data: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.apiService.post(`${config.baseURL}login`, data));
      return response;
    } catch (e) {
      throw new Error(`Wrong username or password`);
    }
  }

  async getTaskService(page: number, text = '', sortType = '', sortBy = ''): Promise<any> {
    try {
      let skip = (page - 1) * config.pageSize;
      let url = `${config.baseURL}task-visu/tasks?&is_active=true&completion_lt=100&top=${config.pageSize}&skip=${skip}&`;
      if (text) url += `search=${text}&`;
      if (sortType && sortBy) url += `sort_order=${sortType}&sort_by=${sortBy}&`;
      const response = await firstValueFrom(
        this.apiService.get<any>(`${url}permission=TASKVISU_SUPERADMIN`, {
          headers: this.headers,
        }),
      );
      return response;
    } catch (e) {
      console.log(`Failed to get task`);
      throw new Error('Failed ,task not avaiable');
    }
  }

  async deleteTask(id: number): Promise<any> {
    const response = await firstValueFrom(
      this.apiService.delete(`${config.baseURL}task-visu/tasks/${id}`, {
        headers: this.headers,
      }),
    );
    return response;
  }

  async existingTask(id: number) {
    const response = await firstValueFrom(
      this.apiService.get(`${config.baseURL}task-visu/tasks/${id}`, {
        headers: this.headers,
      }),
    );
    return response;
  }

  async updateExistingTask(id: number, updateTask: Partial<task>) {
    const response = await firstValueFrom(
      this.apiService.patch(`${config.baseURL}task-visu/tasks/${id}`, updateTask, {
        headers: this.headers,
      }),
    );
    return response;
  }

  async existingUserAndTaskPriority(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.apiService.get(
          `${config.baseURL}task-visu/tasks/populated?expand[]=Users&expand[]=TaskPriority`,
          {
            headers: this.headers,
          },
        ),
      );
      return response;
    } catch (e) {
      console.log('Failed to get existing user and task priority', e);
      throw new Error('Failed to get existing user and task priority');
    }
  }
}
