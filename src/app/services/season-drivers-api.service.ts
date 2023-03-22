import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriversRoot } from '../interfaces/season-drivers.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SeasonDriversApiService {
  apiService = inject(ApiService);

  fetchSeasonDrivers(year: string): Observable<DriversRoot> {
    return this.apiService.fetch<DriversRoot>(`/${year}/drivers.json`);
  }
}
