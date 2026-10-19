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
  isChecked: boolean = false;
  popup(): void {
    alert(`My Info\nName:${this.name}\nId:${this.id}`);
    console.log('check btn clicked');
  }
}
