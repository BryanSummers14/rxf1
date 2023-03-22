import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [NgIf, NgFor],
  selector: 'rxf1-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pageSize = 0;
  @Input() current = 0;
  @Input() total = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeSelect: EventEmitter<number> = new EventEmitter<number>();

  onNext(): void {
    this.next.emit();
  }

  onPrevious(): void {
    this.previous.next(this.current);
  }

  onPageSizeChange(event: Event) {
    if (event && event.target) {
      this.pageSizeSelect.emit(
        parseInt((event.target as HTMLSelectElement).value, 10)
      );
    }
  }
}
