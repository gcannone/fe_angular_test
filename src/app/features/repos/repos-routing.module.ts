import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReposPageComponent } from './pages/repos-page/repos-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ReposPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReposRoutingModule { }
