import { inject, Injectable, signal } from '@angular/core';
import { TaskService } from '../task-service/task-service';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  taskService = inject(TaskService);
  isSortingActive = signal(false);

  openSortingDialog(datasetId: string): void {
    this.taskService.sortBy.set(datasetId);
    console.log('table head clicked:', datasetId);
    this.sorting();
    // console.log(`after calling sort`,this.taskService.sortBy)
    this.isSortingActive.update((active) => !active);
  }
  sortBy(event: Event) {
    event.preventDefault();
    const target = event.target;
    if (!(target instanceof Element)) {
      this.taskService.sortType.set('');
      return;
    }

    const datasetId = target.closest<HTMLButtonElement>('button[data-id]')?.dataset['id'];

    if (datasetId && this.taskService.sortType() != datasetId) {
      // console.log(`dataset value`, datasetId);
      // console.log(`sortType signal value`, this.taskService.sortType());
      this.taskService.sortType.set(datasetId);
      this.sorting();
    }
    //     console.log(`dataset value`, datasetId);
    // console.log(`sortType signal value`, this.taskService.sortType());
  }
  sorting() {
    this.taskService.getTask(
      this.taskService.page(),
      this.taskService.userid(),
      this.taskService.text(),
      this.taskService.sortType(),
      this.taskService.sortBy(),
    );
  }
}
