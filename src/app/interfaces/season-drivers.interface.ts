import { Driver } from './driver.interface';

export interface DriversRoot {
  MRData: Mrdata;
}

export interface Mrdata {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  DriverTable: DriverTable;
}

export interface DriverTable {
  season: string;
  Drivers: Driver[];
}
