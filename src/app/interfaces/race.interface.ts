import { Circuit } from './circuit.interface';
import { RaceResult } from './race-result.interface';
import { RaceResultsSummary } from './race-results-summary.interface';

export interface RaceApi {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results: RaceResult[];
}

export interface RaceState {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  raceSummary: RaceResultsSummary;
  Results: RaceResult[];
}
