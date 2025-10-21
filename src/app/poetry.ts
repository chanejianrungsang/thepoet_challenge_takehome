import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

export interface Poem {
  title: string;
  author: string;
  lines: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PoetryService {
  private apiBase = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBase}/authors`);
  }

  getTitles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBase}/titles`);
  }

  getPoemsByAuthor(author: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${this.apiBase}/author/${author}`);
  }

  getPoemsByTitle(title: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${this.apiBase}/title/${title}`);
  }

  searchPoems(query: string, type: 'author' | 'title'): Observable<Poem[]> {
    const list$ = type === 'author' ? this.getAuthors() : this.getTitles();
    return list$.pipe(
      map(list => list.filter(item => item.toLowerCase().includes(query.toLowerCase()))),
      switchMap(matches => {
        if (matches.length === 0) return [];
        const requests = matches.map(match =>
          type === 'author' ? this.getPoemsByAuthor(match) : this.getPoemsByTitle(match)
        );
        return forkJoin(requests).pipe(
          map(results => results.flat())
        );
      })
    );
  }
}
