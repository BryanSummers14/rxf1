import { SeasonRaceState } from '../reducers/races.reducer';
import { Driver } from './driver.interface';
import { Season } from './seasons.interface';

export interface AppState {
  seasons: Season[];
  drivers: Driver[];
  seasonRaceState: SeasonRaceState;
}
