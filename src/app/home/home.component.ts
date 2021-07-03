import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="p-4">
      <h1>Frontend Developer Assessment</h1>
      <h2>Author: Giuseppe Cannone</h2>
      <h2>Date: 02/07/2021</h2>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
