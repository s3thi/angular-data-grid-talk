import { Component, Input } from '@angular/core';

@Component({
  selector: 'grid',
  template: `
  	<ul class="grid">
  		<li *ngFor="let item of items">{{ item.label }}</li>
  	</ul>
  `,
})
export class GridComponent  {
	@Input() items: any;
}
