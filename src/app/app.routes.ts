import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './services/auth-service/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/task-component/task-component').then((m) => m.TaskComponent),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/dashboard-component/dashboard-component').then(
        (m) => m.DashboardComponent,
      ),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
