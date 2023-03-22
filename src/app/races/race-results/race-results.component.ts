import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { selectRaceResults } from 'src/app/selectors/races-selector';
import { fetchRaceResults } from '../../actions/races.actions';
import { RaceResult } from '../../interfaces/race-result.interface';
import { Race } from '../../interfaces/race.interface';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PaginationService } from '../../pagination/pagination.service';
import { RaceResultComponent } from './race-result/race-result.component';

const enum RaceSummaryStatus {
  FINISHED = 'Finished',
  PLUS_ONE_LAP = '+1 Lap',
  ACCIDENT = 'Collision|Collision damage',
}

type RaceSummary = {
  finished: number;
  accidents: number;
  plusOneLaps: number;
};

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, PaginationComponent, RaceResultComponent],
  providers: [PaginationService],
  selector: 'rxf1-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  // @TODO check race round and year/season from url to ensure only the correct one is shown
  raceResults$: Observable<RaceResult[]> = this.store
    .select(selectRaceResults)
    .pipe(
      // Pulling whole race since additional data may want to be shown in UI
      // Race name and location and whatnot
      map((race) => race.Results)
    );

  // There are better ways of doing this
  // Should probably be calculated in the effect
  raceInfo$: Observable<RaceSummary> = this.raceResults$.pipe(
    map((raceResults) =>
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
      )
    )
  );

  paginatedRaceResults$ = combineLatest([
    this.raceResults$,
    this.paginationService.pagination$,
  ]).pipe(
    map(([races, paginationState]) =>
      races.slice(
        paginationState.cursor,
        paginationState.cursor + paginationState.pageSize
      )
    )
  );

  ngOnInit(): void {
    this.route.paramMap.pipe(distinctUntilChanged()).subscribe({
      next: (params) => {
        const year = params.get('year');
        const round = params.get('round');
        if (year && round) {
          this.store.dispatch(fetchRaceResults({ year, round }));
        }
      },
    });
  }

  backToRaces() {
    const routeSnapshot = this.route.snapshot;
    const { paramMap: params } = routeSnapshot;
    const year = params.get('year');
    this.router.navigate([year, 'races']);
  }
}
