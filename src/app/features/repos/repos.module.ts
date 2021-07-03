import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

import { ReposPageComponent } from './pages/repos-page/repos-page.component';
import { ReposRoutingModule } from './repos-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReposToolbarComponent } from './components/repos-toolbar/repos-toolbar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ReposRoutingModule,
    SharedModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReposPageComponent,
    ReposToolbarComponent
  ],
  declarations: [
    ReposPageComponent,
    ReposToolbarComponent
  ]
})
export class ReposModule { }
