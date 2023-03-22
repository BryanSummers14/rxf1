import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { selectRaceResults } from 'src/app/selectors/races-selector';
import { fetchRaceResults } from '../../actions/races.actions';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PaginationService } from '../../pagination/pagination.service';
import { RaceResultComponent } from './race-result/race-result.component';

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
  raceResults$ = this.store.select(selectRaceResults);

  paginatedRaceResults$ = combineLatest([
    this.raceResults$,
    this.paginationService.pagination$,
  ]).pipe(
    map(([races, paginationState]) =>
      races.Results.slice(
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
