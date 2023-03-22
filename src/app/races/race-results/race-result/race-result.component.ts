import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RaceResult } from '../../../interfaces/race-result.interface';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'rxf1-race-result',
  templateUrl: 'race-result.component.html',
  styleUrls: ['./race-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceResultComponent {
  @Input() raceResult!: RaceResult;
}
