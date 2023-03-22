import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Season } from '../interfaces/seasons.interface';

export const selectSeasonsFeature =
  createFeatureSelector<ReadonlyArray<Season>>('seasons');

export const selectSeasons = createSelector(selectSeasonsFeature, (seasons) => {
  return seasons.map((season) => season.season);
});
