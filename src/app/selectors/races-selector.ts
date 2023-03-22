import { AppState } from '../interfaces/state.interface';

export const selectRaces = (state: AppState) => state.seasonRaceState.races;

export const selectRaceResults = (state: AppState) =>
  state.seasonRaceState.raceResults;

export const selectQualifyingResults = (state: AppState) =>
  state.seasonRaceState.qualifyingResults;
