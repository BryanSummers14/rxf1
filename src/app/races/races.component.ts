import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, map, share } from 'rxjs';
import { fetchRaces } from '../actions/races.actions';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationService } from '../pagination/pagination.service';
import { selectRaces } from '../selectors/races-selector';

@Component({
  selector: 'rxf1-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  standalone: true,
  providers: [PaginationService],
  imports: [AsyncPipe, NgIf, NgFor, RouterModule, PaginationComponent],
})
export class RacesComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  paginationService = inject(PaginationService);
  races$ = this.store.select(selectRaces).pipe(share());

  paginatedRaces$ = combineLatest([
    this.races$,
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
        if (year) {
          this.store.dispatch(fetchRaces({ year }));
        }
      },
    });
  }

  viewRaceResults(round: string) {
    const routeSnapshot = this.route.snapshot;
    const year = routeSnapshot.paramMap.get('year');
    if (year) {
      this.router.navigate([year, 'races', round, 'results']);
    }
  }

  viewQualResults(round: string) {
    const routeSnapshot = this.route.snapshot;
    const year = routeSnapshot.paramMap.get('year');
    if (year) {
      this.router.navigate([year, 'races', round, 'qualifying-results']);
    }
  }
}
