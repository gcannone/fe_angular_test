import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommitsRoutingModule } from './commits-routing.module';

import { CommitsPageComponent } from './pages/commits-page/commits-page.component';

@NgModule({
  imports: [
    CommonModule,
    CommitsRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    CommitsPageComponent
  ],
  providers: [],
})
export class CommitsModule { }
