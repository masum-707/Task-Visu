import { Component, inject } from '@angular/core';
import { Sidebar } from '../../services/sidebar-service/sidebar';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  sidebarService = inject(Sidebar);
}
