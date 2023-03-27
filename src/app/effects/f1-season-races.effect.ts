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
import { RaceResult } from '../interfaces/race-result.interface';
import { SeasonRacesApiService } from '../services/season-races-api.service';

// @TODO break this out into a separate lib/file
const enum RaceSummaryStatus {
  FINISHED = 'Finished',
  PLUS_ONE_LAP = '+1 Lap',
  ACCIDENT = 'Collision|Collision damage',
}

const getRaceResultsSummary = (raceResults: RaceResult[]) =>
  raceResults.reduce(
    (raceSummary, race) => {
      if (race.status === RaceSummaryStatus.FINISHED) {
        raceSummary.finished += 1;
        return raceSummary;
      }
      // Do plus 2 and plus 3 laps count? I honestly have no idea
      if (race.status === RaceSummaryStatus.PLUS_ONE_LAP) {
        raceSummary.plusOneLaps += 1;
        return raceSummary;
      }
      if (RaceSummaryStatus.ACCIDENT.includes(race.status)) {
        raceSummary.accidents += 1;
        return raceSummary;
      }
      return raceSummary;
    },
    { accidents: 0, finished: 0, plusOneLaps: 0 }
  );

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
          // Here would be an ok place to switchmap and fetch all the results
          // For each race, but with it being a public api, I decided against
          // Fetching and batching with a forkJoin since it seemed to overload the server
          // Same with qualifying.
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
            const race = raceResultsData.MRData.RaceTable.Races[0];
            return setRaceResults({
              raceResults: {
                ...race,
                raceSummary: getRaceResultsSummary(race.Results),
              },
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
