import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-component-life-cycle',
  imports: [],
  templateUrl: './component-life-cycle.html',
  styleUrl: './component-life-cycle.css',
})
export class ComponentLifeCycle implements OnChanges, OnInit, OnDestroy {
  @Input({ required: true }) productName: string = '';
  @Input() price = 1000;
  constructor() {
    console.log('1. Constructor called');
  }

  // changeValue(): void {
  //   this.productName = 'mobile';
  // }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productName']) {
      console.log('Product Name changed:', changes['productName']);
    }
    if (changes['price']) {
      console.log('Price changed:', changes['price'].currentValue);
    }
  }

  ngOnInit(): void {
    console.log('2. Component initialized');
    console.log(this.productName);
    console.log(this.price);
    // this.changeValue();
  }

  ngOnDestroy(): void {
    console.log('3. Component destroyed');
  }
}
