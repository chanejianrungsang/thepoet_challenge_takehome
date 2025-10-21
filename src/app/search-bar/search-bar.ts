import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBar {
  @Output() search = new EventEmitter<{ query: string; type: 'author' | 'title' }>();

  searchType: 'author' | 'title' = 'author';
  query = '';

  onSearch() {
    if (this.query.trim()) {
      this.search.emit({ query: this.query.trim(), type: this.searchType });
    }
  }
}
