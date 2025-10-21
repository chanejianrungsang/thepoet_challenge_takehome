import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { SearchBar } from './search-bar/search-bar';
import { ErrorDisplay } from './error-display/error-display';
import { PoemCard } from './poem-card/poem-card';
import { Footer } from './footer/footer';
import { PoemModal } from './poem-modal/poem-modal';
import { PoetryService } from './poetry.service';
import { Poem } from './poetry.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    Header,
    SearchBar,
    ErrorDisplay,
    PoemCard,
    Footer,
    PoemModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  poems = signal<Poem[]>([]);
  errorMessage = signal<string>('');
  selectedPoem = signal<Poem | null>(null);

  constructor(private poetryService: PoetryService) {}

  onSearch(searchData: { query: string; type: 'author' | 'title' }) {
    this.errorMessage.set('');
    this.poems.set([]);

    this.poetryService.searchPoems(searchData.query, searchData.type).subscribe({
      next: (poems) => {
        this.poems.set(poems);
      },
      error: (error) => {
        this.errorMessage.set('Failed to fetch poems. Please try again.');
        console.error('Search error:', error);
      }
    });
  }

  openModal(poem: Poem) {
    this.selectedPoem.set(poem);
  }

  closeModal() {
    this.selectedPoem.set(null);
  }
}
