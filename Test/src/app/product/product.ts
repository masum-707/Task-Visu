import { Component } from '@angular/core';
import { Stock } from '../stock/stock';

@Component({
  selector: 'app-product',
  imports: [Stock],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  productName = 'Laptop';
  price = 50000;
  isAvailable = false;
}
