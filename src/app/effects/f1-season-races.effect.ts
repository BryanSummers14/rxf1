import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  fetchRaceQualifyingResults,
  fetchRaceResults,
  fetchRaces,
  setQualifyingResults,
  setRaceResults,
  setRaces,
} from '../actions/races.actions';
import { SeasonRacesApiService } from '../services/season-races-api.service';

@Injectable()
export class F1SeasonRacesEffect {
  seasonRacesService = inject(SeasonRacesApiService);
  router = inject(Router);
  actions$ = inject(Actions);

  loadRaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRaces),
      exhaustMap(({ year }) =>
        this.seasonRacesService.fetchSeasonRaces(year).pipe(
          map((raceData) => {
            return setRaces({
              races: raceData,
            });
          }),
          catchError((error) =>
            of({ type: '[Race State] Fetch Races Error', error })
          )
        )
      )
    )
  );

  loadRaceResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRaceResults),
      exhaustMap(({ year, round }) =>
        this.seasonRacesService.fetchRaceResults({ year, round }).pipe(
          map((raceResultsData) => {
            return setRaceResults({
              raceResults: raceResultsData.MRData.RaceTable.Races[0],
            });
          }),
          catchError((error) =>
            of({ type: '[Race State] Fetch Race Results Error', error })
          )
        )
      )
    )
  );

  loadRaceQualifyingResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRaceQualifyingResults),
      exhaustMap(({ year, round }) =>
        this.seasonRacesService
          .fetchRaceQualifyingResults({ year, round })
          .pipe(
            map((qualifyingResultsData) => {
              return setQualifyingResults({
                qualifyingResults:
                  qualifyingResultsData.MRData.RaceTable.Races[0],
              });
            }),
            catchError((error) =>
              of({
                type: '[Race State] Fetch Race Qualifying Results Error',
                error,
              })
            )
          )
      )
    )
  );
}
