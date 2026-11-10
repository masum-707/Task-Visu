import { Component } from '@angular/core';
import { Debounce } from '../../utilities/debounce';

@Component({
  selector: 'app-searchbar-component',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  debounceSearch = new Debounce();

  text = '';
  search = this.debounceSearch.debounce((value: string) => {
    this.text = value;
    console.log(this.text);
  }, 300);

  onTyping(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search(target.value);
  }
}
