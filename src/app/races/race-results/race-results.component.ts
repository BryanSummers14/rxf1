import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { RaceResult } from '../../interfaces/race-result.interface';
import { fetchRaceResults } from '../../actions/races.actions';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PaginationService } from '../../pagination/pagination.service';
import { selectRaceResults } from '../../selectors/races-selector';
import { RaceResultComponent } from './race-result/race-result.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, PaginationComponent, RaceResultComponent],
  providers: [PaginationService],
  selector: 'rxf1-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit, OnDestroy {
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  // @TODO check race round and year/season from url to ensure only the correct one is shown
  raceResults$ = this.store.select(selectRaceResults);

  paginatedRaceResults$ =
    this.paginationService.getPaginatedResults<RaceResult>(
      this.raceResults$.pipe(map((race) => race.Results))
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
            this.store.dispatch(fetchRaceResults({ year, round }));
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
