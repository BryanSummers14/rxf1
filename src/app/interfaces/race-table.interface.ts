import { RaceApi } from './race.interface';

export interface RaceTable {
  season: string;
  round: string;
  Races: RaceApi[];
}
