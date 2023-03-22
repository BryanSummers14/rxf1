import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RaceQualifyingRoot } from '../interfaces/race-qualifying-results.interface';
import { RaceResultRoot } from '../interfaces/race-results.interface';
import { RaceRoot, SeasonRace } from '../interfaces/season-races.interface';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SeasonRacesApiService {
  apiService = inject(ApiService);

  fetchSeasonRaces(year: string): Observable<SeasonRace[]> {
    return this.apiService.fetch<RaceRoot>(`/${year}.json`).pipe(
      map((raceData) =>
        raceData.MRData.RaceTable.Races.map((race) => ({
          raceName: race.raceName,
          round: race.round,
        }))
      )
    );
  }

  fetchRaceResults({
    year,
    round,
  }: {
    year: string;
    round: string;
  }): Observable<RaceResultRoot> {
    return this.apiService.fetch<RaceResultRoot>(
      `/${year}/${round}/results.json`
    );
  }

  fetchRaceQualifyingResults({
    year,
    round,
  }: {
    year: string;
    round: string;
  }): Observable<RaceQualifyingRoot> {
    return this.apiService.fetch<RaceQualifyingRoot>(
      `/${year}/${round}/qualifying.json`
    );
  }
}
