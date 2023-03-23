import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  share,
  Subject,
  takeUntil,
} from 'rxjs';
import { selectQualifyingResults } from 'src/app/selectors/races-selector';
import { fetchRaceQualifyingResults } from '../../actions/races.actions';
import { QualifyingRace } from '../../interfaces/qualifying-race.interface';
import { QualifyingResult } from '../../interfaces/qualifying-result.interface';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PaginationService } from '../../pagination/pagination.service';
import { QualifyingResultComponent } from './race-qualifying-result/race-qualifying-result.component';

@Component({
  standalone: true,
  providers: [PaginationService],
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    QualifyingResultComponent,
    PaginationComponent,
  ],
  selector: 'rxf1-race-qualifying-results',
  templateUrl: './race-qualifying-results.component.html',
  styleUrls: ['./race-qualifying-results.component.scss'],
})
export class RaceQualifyingResultsComponent implements OnInit, OnDestroy {
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  qualifyingRaceResults$: Observable<QualifyingResult[]> = this.store
    .select(selectQualifyingResults)
    .pipe(
      // Just pulling off results, but pulling whole Qualifier so additional data
      // i.e. race name, circuit, location and whatnot could also be used in the UI
      map(
        (qualifyingRace) => (qualifyingRace as QualifyingRace).QualifyingResults
      ),
      share()
    );

  paginatedQualifyingRaceResults$ = combineLatest([
    this.qualifyingRaceResults$,
    this.paginationService.pagination$,
  ]).pipe(
    map(([qualfyingRaces, paginationState]) =>
      qualfyingRaces.slice(
        paginationState.cursor,
        paginationState.cursor + paginationState.pageSize
      )
    )
  );

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe({
        next: (params) => {
          const year = params.get('year');
          const round = params.get('round');
          if (year && round) {
            this.store.dispatch(fetchRaceQualifyingResults({ year, round }));
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  backToRaces() {
    const routeSnapshot = this.route.snapshot;
    const { paramMap: params } = routeSnapshot;
    const year = params.get('year');
    this.router.navigate([year, 'races']);
  }
}
