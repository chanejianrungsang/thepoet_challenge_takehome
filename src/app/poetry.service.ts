import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, of } from 'rxjs';

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
    // API returns { authors: string[] }
    return this.http.get<{ authors: string[] }>(`${this.apiBase}/authors`).pipe(
      map(res => res && Array.isArray(res.authors) ? res.authors : [])
    );
  }

  getTitles(): Observable<string[]> {
    // API returns { titles: string[] }
    return this.http.get<{ titles: string[] }>(`${this.apiBase}/titles`).pipe(
      map(res => res && Array.isArray(res.titles) ? res.titles : [])
    );
  }

  getPoemsByAuthor(author: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${this.apiBase}/author/${encodeURIComponent(author)}`);
  }

  getPoemsByTitle(title: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${this.apiBase}/title/${encodeURIComponent(title)}`);
  }

  searchPoems(query: string, type: 'author' | 'title'): Observable<Poem[]> {
    const list$ = type === 'author' ? this.getAuthors() : this.getTitles();
    return list$.pipe(
      map(list => Array.isArray(list) ? list.filter(item => item.toLowerCase().includes(query.toLowerCase())) : []),
      switchMap(matches => {
        if (matches.length === 0) return of([]);
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