import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { config } from '../../config/config';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css',
})
export class PaginationComponent {
  task = inject(TaskService);

  previous() {
    this.task.page.update((page) => (page -= 1));
    this.task.getTask(this.task.page(), this.task.text(), this.task.sortType(), this.task.sortBy());
  }
  next() {
    if (this.task.page() >= this.maxPage()) return;
    this.task.page.update((page) => (page += 1));
    this.task.getTask(this.task.page(), this.task.text(), this.task.sortType(), this.task.sortBy());
    // console.log(this.task.page());
  }
  maxPage = computed(() => {
    return Math.ceil(this.task.totalTasks() / config.pageSize);
  });
}
