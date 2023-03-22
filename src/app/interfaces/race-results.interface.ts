import { RaceTable } from './race-table.interface';

export interface RaceResultRoot {
  MRData: Mrdata;
}

export interface Mrdata {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}
