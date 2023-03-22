import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { fetchSeasons, setSeasons } from '../actions/seasons.actions';
import { SeasonsApiService } from '../services/seasons-api.service';

@Injectable()
export class F1SeasonsEffect {
  seasonsService = inject(SeasonsApiService);
  actions$ = inject(Actions);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSeasons),
      exhaustMap(() =>
        this.seasonsService.fetchSeasons().pipe(
          map((data) =>
            setSeasons({
              seasons: data.MRData.SeasonTable.Seasons,
            })
          ),
          catchError((error) =>
            of({ type: '[Seasons State] Fetch Seasons Error', error })
          )
        )
      )
    )
  );
}
