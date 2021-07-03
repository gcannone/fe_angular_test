import { SpinnerComponent } from './components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { PageComponent } from './components/page/page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    TableComponent,
    PaginatorComponent,
    PageComponent,
    SpinnerComponent
  ],
  exports: [
    TableComponent,
    PaginatorComponent,
    PageComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
