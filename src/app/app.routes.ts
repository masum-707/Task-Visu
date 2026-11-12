import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './services/auth-service/auth.guard';
import { TaskForm } from './components/task-form/task-form';
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
    path: 'taskForm',
    canActivate: [authGuard],
    component: TaskForm,
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
