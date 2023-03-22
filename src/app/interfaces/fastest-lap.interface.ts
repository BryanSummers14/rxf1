import { AverageSpeed } from './average-speed.interface';
import { Time } from './time.interface';

export interface FastestLap {
  rank: string;
  lap: string;
  Time: Time;
  AverageSpeed: AverageSpeed;
}
