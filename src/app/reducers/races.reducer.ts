import { createReducer, on } from '@ngrx/store';
import {
  setQualifyingResults,
  setRaceResults,
  setRaces,
} from '../actions/races.actions';
import { QualifyingRace } from '../interfaces/qualifying-race.interface';
import { RaceState } from '../interfaces/race.interface';
import { SeasonRace } from '../interfaces/season-races.interface';

export type SeasonRaceState = {
  races: Array<SeasonRace>;
  raceResults: RaceState;
  qualifyingResults: QualifyingRace;
};

export const initialRacesState: Readonly<SeasonRaceState> = {
  races: [],
  raceResults: {
    raceName: '',
    round: '',
    season: '',
    url: '',
    date: '',
    time: '',
    Results: [],
    Circuit: {
      circuitId: '',
      circuitName: '',
      url: '',
      Location: {
        lat: '',
        locality: '',
        long: '',
        country: '',
      },
    },
    raceSummary: {
      accidents: 0,
      finished: 0,
      plusOneLaps: 0,
    },
  },
  qualifyingResults: {
    raceName: '',
    round: '',
    season: '',
    url: '',
    date: '',
    time: '',
    QualifyingResults: [],
    Circuit: {
      circuitId: '',
      circuitName: '',
      url: '',
      Location: {
        lat: '',
        locality: '',
        long: '',
        country: '',
      },
    },
  },
};

export const racesReducer = createReducer(
  initialRacesState,
  on(setRaces, (state, { races }) => ({
    ...state,
    races,
  })),
  on(setRaceResults, (state, { raceResults }) => ({
    ...state,
    raceResults,
  })),
  on(setQualifyingResults, (state, { qualifyingResults }) => ({
    ...state,
    qualifyingResults,
  }))
);
