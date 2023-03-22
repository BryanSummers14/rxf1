import { createReducer, on } from '@ngrx/store';
import { setDrivers } from '../actions/drivers.actions';
import { Driver } from '../interfaces/driver.interface';

export const initialDriversState: ReadonlyArray<Driver> = [];

export const driversReducer = createReducer(
  initialDriversState,
  on(setDrivers, (_, { drivers }) => drivers)
);
