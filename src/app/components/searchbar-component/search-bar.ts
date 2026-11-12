import { Component, inject } from '@angular/core';
import { Debounce } from '../../utilities/debounce';
import { TaskService } from '../../services/task-service/task-service';

@Component({
  selector: 'app-searchbar-component',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  taskService = inject(TaskService);
  debounceSearch = new Debounce();

  search = this.debounceSearch.debounce((value: string) => {
    this.taskService.text.set(value);
    console.log(this.taskService.text());
  }, 500);

  onTyping(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search(target.value);
  }
}
