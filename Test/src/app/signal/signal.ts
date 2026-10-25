import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.html',
  styleUrl: './signal.css',
})
export class Signal {
  value = signal(100);
  constructor() {
    console.log(this.value());
  }
  newValue = computed(() => this.value() + 100);
  ngOnInit(): void {
    this.value.set(111);
    console.log(this.value());
    console.log(this.newValue());
  }
}
