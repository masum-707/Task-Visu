import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sorting',
  imports: [],
  templateUrl: './sorting.html',
  styleUrl: './sorting.css',
})
export class Sorting {
  headName = input.required<string>();
}
