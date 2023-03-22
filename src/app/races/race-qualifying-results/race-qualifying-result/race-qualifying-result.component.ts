import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QualifyingResult } from '../../../interfaces/qualifying-result.interface';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'rxf1-race-qualifying-result',
  templateUrl: 'race-qualifying-result.component.html',
  styleUrls: ['./race-qualifying-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QualifyingResultComponent {
  @Input() qualifyingResult!: QualifyingResult;
}
