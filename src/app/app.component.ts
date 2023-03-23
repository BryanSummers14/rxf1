import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fetchSeasons } from './actions/seasons.actions';
import { selectSeasons } from './selectors/seasons-selector';

@Component({
  selector: 'rxf1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  seasons$ = this.store.select(selectSeasons);

  ngOnInit() {
    this.store.dispatch(fetchSeasons());
  }

  viewDrivers(year: string) {
    this.router.navigate([year, 'drivers']);
  }

  viewRaces(year: string) {
    this.router.navigate([year, 'races']);
  }
}
