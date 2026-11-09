import { Component, inject } from '@angular/core';
import { Sidebar } from '../../services/sidebar-service/sidebar';

@Component({
  selector: 'app-sidebar-component',
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  sidebarService = inject(Sidebar);
}
