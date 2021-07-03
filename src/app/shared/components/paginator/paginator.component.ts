import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

export interface PaginatorConfig {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  @Input() set config(value: PaginatorConfig) {
    this._config = value;
    this.cdRef.markForCheck();
  };

  private _config!: PaginatorConfig;

  get config() {
    return this._config;
  }

  @Output() onNext = new EventEmitter<void>();
  @Output() onPrev = new EventEmitter<void>();

  constructor(private cdRef: ChangeDetectorRef) {}

}
