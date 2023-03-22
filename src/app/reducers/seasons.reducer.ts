import { createReducer, on } from '@ngrx/store';
import { setSeasons } from '../actions/seasons.actions';
import { Season } from '../interfaces/seasons.interface';

export const initialSeasonState: ReadonlyArray<Season> = [];

export const seasonsReducer = createReducer(
  initialSeasonState,
  on(setSeasons, (_, { seasons }) => seasons)
);
