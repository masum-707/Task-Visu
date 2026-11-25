import { Component, inject } from '@angular/core';
import { SearchBar } from '../searchbar-component/search-bar';
import { SortingService } from '../../services/sorting-service/sorting-service';

@Component({
  selector: 'app-sorting',
  imports: [SearchBar],
  templateUrl: './sorting.html',
  styleUrl: './sorting.css',
})
export class Sorting {
  sortingService = inject(SortingService);
}
