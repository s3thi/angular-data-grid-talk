import { Component } from '@angular/core';

@Component({
  selector: 'grid',
  template: `
  	<ul>
  		<li *ngFor="let item of items">{{ item.label }}</li>
  	</ul>
  `,
})
export class GridComponent  { }
