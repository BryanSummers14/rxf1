import { QualifyingRace } from './qualifying-race.interface';

export interface QualifyingRaceTable {
  season: string;
  round: string;
  Races: QualifyingRace[];
}
