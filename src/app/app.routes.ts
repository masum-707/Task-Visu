import { Routes } from '@angular/router';
import { TaskComponent } from './components/task-component/task-component';
import { authGuard } from './services/auth-service/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import(`./components/login-component/login-component`).then((m) => m.LoginComponent),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/task-component/task-component').then((m) => m.TaskComponent),
  },
];
