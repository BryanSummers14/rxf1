import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Driver } from '../interfaces/driver.interface';

export const selectDriversFeature = createFeatureSelector<Driver[]>('drivers');

export const selectDrivers = createSelector(
  selectDriversFeature,
  (driver) => driver
);
