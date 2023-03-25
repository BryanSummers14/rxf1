import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

type PaginatorState = {
  pageSize: number;
  cursor: number;
};

// Ideally just use the API for pagination (they did a good job with it in my opinion) and not hold on to any 'state'
// But with it being a public, free API... trying to hit it as few times as possible
// Since most result sets are not really all that large anyway
@Injectable()
export class PaginationService {
  private paginationState$ = new BehaviorSubject<PaginatorState>({
    pageSize: 10,
    cursor: 0,
  });

  pagination$ = this.paginationState$.asObservable();

  pageNext() {
    const { pageSize, cursor } = this.paginationState$.value;
    this.paginationState$.next({
      pageSize,
      cursor: cursor + pageSize,
    });
  }

  pagePrevious() {
    const { pageSize, cursor } = this.paginationState$.value;
    this.paginationState$.next({
      pageSize,
      cursor: cursor - pageSize,
    });
  }

  pageSizeSelect(pageSize: number) {
    this.paginationState$.next({
      pageSize,
      // Maybe a better way to do this?
      // But I figured best to just reset the cursor, at least for now
      cursor: 0,
    });
  }

  getPaginatedResults<T>(results$: Observable<T[]>): Observable<T[]> {
    return combineLatest([results$, this.pagination$]).pipe(
      map(([results, paginationState]) =>
        results.slice(
          paginationState.cursor,
          paginationState.cursor + paginationState.pageSize
        )
      )
    );
  }
}
