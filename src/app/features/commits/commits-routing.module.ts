import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommitsPageComponent } from './pages/commits-page/commits-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CommitsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitsRoutingModule { }
