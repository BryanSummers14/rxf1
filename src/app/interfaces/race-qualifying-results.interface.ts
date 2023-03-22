import { QualifyingRaceTable } from './qualifying-race-table.interface';

export interface RaceQualifyingRoot {
  MRData: Mrdata;
}

export interface Mrdata {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: QualifyingRaceTable;
}
