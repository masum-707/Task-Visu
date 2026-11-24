import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './services/auth-service/auth.guard';
import { CreateTask } from './components/task-create/create-task';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'navbar',
    canActivate: [authGuard],
    loadComponent: () =>
      import(`./components/navbar-component/navbar-component`).then((m) => m.NavbarComponent),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () => import('./Page/all-task/all-task').then((m) => m.AllTask),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./Page/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'sub-responsible-task',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Page/sub-responsible-task/sub-responsible-task').then((m) => m.SubResponsibleTask),
  },
  {
    path: 'myTask',
    canActivate: [authGuard],
    loadComponent: () => import('./Page/my-task/my-task').then((m) => m.MyTask),
  },

  {
    path: 'taskForm',
    canActivate: [authGuard],
    loadComponent: () => import('./components/task-form/task-form').then((m) => m.TaskForm),
  },

  {
    path: 'createtask',
    canActivate: [authGuard],
    component: CreateTask,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
