import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: ':year/drivers',
    loadComponent: () =>
      import('./drivers/drivers.component').then((mod) => mod.DriversComponent),
  },
  {
    path: ':year/races',
    pathMatch: 'full',
    loadComponent: () =>
      import('./races/races.component').then((mod) => mod.RacesComponent),
  },
  {
    path: ':year/races/:round/results',
    loadComponent: () =>
      import('./races/race-results/race-results.component').then(
        (mod) => mod.RaceResultsComponent
      ),
    pathMatch: 'full',
  },
  {
    path: ':year/races/:round/qualifying-results',
    loadComponent: () =>
      import(
        './races/race-qualifying-results/race-qualifying-results.component'
      ).then((mod) => mod.RaceQualifyingResultsComponent),
    pathMatch: 'full',
  },
];
