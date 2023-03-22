import { createAction, props } from '@ngrx/store';
import { Driver } from '../interfaces/driver.interface';

export const fetchDrivers = createAction(
  '[Drivers State] Fetch Drivers',
  props<{ year: string }>()
);
export const setDrivers = createAction(
  '[Drivers State] Set Drivers',
  props<{ drivers: Driver[] }>()
);
