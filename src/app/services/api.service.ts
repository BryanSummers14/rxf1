import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';

// This would likely be a base 'rest' service
// That handles auth and other things under the hood like blobs and such
// But for this api, a simple fetch is all that's needed
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseURL = 'https://ergast.com/api/f1';
  private cache = new Map<string, any>();
  constructor(private httpClient: HttpClient) {}

  // This is purely personal preference thing
  // But I use fetch for when I 'fetch' resources across the wire
  // If I'm not going across the wire I use 'get'
  fetch<T>(url: string): Observable<T> {
    // The most naive caching strategy possible, I would NEVER use this in production
    // But I did run into issues making too many requests during dev and got timed out
    // For a bit, I do owe the API maintainer a tip or something
    // Since it's historical data and pretty static, should be fine for this particular use case
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.httpClient.get<T>(`${this.baseURL}${url}`).pipe(
      tap((result) => {
        this.cache.set(url, result as T);
      })
    );
  }
}
