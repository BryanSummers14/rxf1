import { Circuit } from './circuit.interface';
import { QualifyingResult } from './qualifying-result.interface';

export interface QualifyingRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  QualifyingResults: QualifyingResult[];
}
