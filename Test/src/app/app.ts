import { Component, signal } from '@angular/core';
import { Test } from './test/test';
import { Product } from './product/product';

@Component({
  selector: 'app-root',
  imports: [Test, Product],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Test');
}
