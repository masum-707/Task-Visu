import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Sidebar {
  isSidebarHidden = signal(false);

  toggle() {
    this.isSidebarHidden.update((hidden) => !hidden);
  }
}
