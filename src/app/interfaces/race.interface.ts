import { Circuit } from './circuit.interface';
import { RaceResult } from './race-result.interface';

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results: RaceResult[];
}
