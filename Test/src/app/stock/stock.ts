import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  imports: [],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  // quantity: number = 10;
  quantity: number = 10;

  increases(): void {
    this.quantity++;
  }
  decreases(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
