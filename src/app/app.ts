import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { NavbarComponent } from './components/navbar-component/navbar-component';
import { TaskComponent } from './components/task-component/task-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, NavbarComponent, TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TaskVisu');
}
