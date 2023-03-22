import { createAction, props } from '@ngrx/store';
import { Season } from '../interfaces/seasons.interface';

export const fetchSeasons = createAction('[Seasons State] Fetch Seasons');
export const setSeasons = createAction(
  '[Seasons State] Set Seasons',
  props<{ seasons: Season[] }>()
);
