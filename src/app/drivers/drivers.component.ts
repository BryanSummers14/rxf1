import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, map, share } from 'rxjs';
import { fetchDrivers } from '../actions/drivers.actions';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationService } from '../pagination/pagination.service';
import { selectDrivers } from '../selectors/drivers-selector';

@Component({
  standalone: true,
  providers: [PaginationService],
  imports: [AsyncPipe, NgIf, NgFor, DatePipe, PaginationComponent],
  selector: 'rxf1-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);
  paginationService = inject(PaginationService);
  drivers$ = this.store.select(selectDrivers).pipe(share());

  paginatedDrivers$ = combineLatest([
    this.drivers$,
    this.paginationService.pagination$,
  ]).pipe(
    map(([drivers, paginationState]) =>
      drivers.slice(
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
          this.store.dispatch(fetchDrivers({ year }));
        }
      },
    });
  }
}
