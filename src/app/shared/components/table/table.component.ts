import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnConfig } from './table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {

  @Input()  dataSource!: MatTableDataSource<T>;
  @Input() set columns(values: ColumnConfig[]) {
    this._columns = values;
    this.displayedColumns = values?.map(value => value.name);
    this.cdRef.markForCheck();
  }

  @Input() rowClickable = true;

  @Output() onClickRow = new EventEmitter<T>();

  displayedColumns: string[] = [];

  private _columns: ColumnConfig[] = [];

  get columns() {
    return this._columns;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

}
