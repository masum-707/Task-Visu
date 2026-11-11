import { Component, inject } from '@angular/core';
import { Sidebar } from '../../services/sidebar-service/sidebar';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  sidebarService = inject(Sidebar);
}
