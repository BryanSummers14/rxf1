import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, share, Subject, takeUntil } from 'rxjs';
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
export class DriversComponent implements OnInit, OnDestroy {
  store = inject(Store);
  route = inject(ActivatedRoute);
  paginationService = inject(PaginationService);
  drivers$ = this.store.select(selectDrivers).pipe(share());

  paginatedDrivers$ = this.paginationService.getPaginatedResults(this.drivers$);

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe({
        next: (params) => {
          const year = params.get('year');
          if (year) {
            this.store.dispatch(fetchDrivers({ year }));
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
