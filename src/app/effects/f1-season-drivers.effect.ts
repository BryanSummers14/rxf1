import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { fetchDrivers, setDrivers } from '../actions/drivers.actions';
import { SeasonDriversApiService } from '../services/season-drivers-api.service';

@Injectable()
export class F1SeasonDriversEffect {
  seasonDriversService = inject(SeasonDriversApiService);
  actions$ = inject(Actions);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDrivers),
      exhaustMap(({ year }) =>
        this.seasonDriversService.fetchSeasonDrivers(year).pipe(
          map((data) =>
            setDrivers({
              drivers: data.MRData.DriverTable.Drivers,
            })
          ),
          catchError(() => of({ type: 'error' }))
        )
      )
    )
  );
}
