import { Component, signal } from '@angular/core';
import { Test } from './test/test';
import { Product } from './product/product';
import { ComponentLifeCycle } from './component-life-cycle/component-life-cycle';

@Component({
  selector: 'app-root',
  imports: [Test, Product, ComponentLifeCycle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Test');
}
