import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeasonsRoot } from '../interfaces/seasons.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SeasonsApiService {
  apiService = inject(ApiService);

  fetchSeasons(): Observable<SeasonsRoot> {
    return this.apiService.fetch<SeasonsRoot>(
      '/seasons.json?offset=67&limit=6'
    );
  }
}
