import { createAction, props } from '@ngrx/store';
import { QualifyingRace } from '../interfaces/qualifying-race.interface';
import { Race } from '../interfaces/race.interface';
import { SeasonRace } from '../interfaces/season-races.interface';

export const fetchRaces = createAction(
  '[Races State] Fetch Races',
  props<{ year: string }>()
);

export const fetchRaceResults = createAction(
  '[Races State] Fetch Race Results',
  props<{ year: string; round: string }>()
);

export const fetchRaceQualifyingResults = createAction(
  '[Races State] Fetch Race Qualifying Results',
  props<{ year: string; round: string }>()
);

export const setRaces = createAction(
  '[Races State] Set Races',
  props<{ races: SeasonRace[] }>()
);

export const setRaceResults = createAction(
  '[Races State] Set Race Results',
  props<{ raceResults: Race }>()
);

export const setQualifyingResults = createAction(
  '[Races State] Set Race Qualifying Results',
  props<{ qualifyingResults: QualifyingRace }>()
);
