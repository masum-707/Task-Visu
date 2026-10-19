import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  id: string = '101M';
  name: string = 'Masum';
  isChecked: boolean = true;
  toggle(): void {
    if (this.name === 'Masum') {
      this.isChecked = false;
    }
  }
}
