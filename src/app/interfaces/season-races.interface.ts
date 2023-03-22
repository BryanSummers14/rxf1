import { RaceTable } from './race-table.interface';

export interface RaceRoot {
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

export type SeasonRace = {
  raceName: string;
  round: string;
};
