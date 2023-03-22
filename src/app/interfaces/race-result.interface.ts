import { Constructor } from './constructor.interface';
import { Driver } from './driver.interface';
import { FastestLap } from './fastest-lap.interface';
import { Time } from './time.interface';

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: Time;
  FastestLap?: FastestLap;
}
