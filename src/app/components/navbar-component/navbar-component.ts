import { Component, inject } from '@angular/core';
import { Sidebar } from '../../services/sidebar-service/sidebar';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  sidebarService = inject(Sidebar);
  authService = inject(AuthService);
}
