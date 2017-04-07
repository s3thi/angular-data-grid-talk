import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<grid [items]="items"></grid>`,
})
export class AppComponent  {
	items: Array<any>;
	
	constructor() {
		this.items = new Array(10000).fill(0).map((_, i) => ({ label: `Item ${i+1}`, index: i + 1 }));
	}
}
