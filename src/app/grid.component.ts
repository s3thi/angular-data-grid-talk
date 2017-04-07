import { Component, Input, ViewChild, ElementRef } from '@angular/core';

const itemHeightPx = 30;

@Component({
  selector: 'grid',
  template: `
  	<ul #gridContainer class="grid">
  		<li *ngFor="let item of items">{{ item.label }}</li>
  	</ul>
  `,
})
export class GridComponent  {
	@Input() items: any;
	@ViewChild("gridContainer") container: ElementRef;

	ngAfterViewInit() {
		const containerHeightPx = this.container.nativeElement.clientHeight;
		const numVisibleChildren = Math.ceil(containerHeightPx / itemHeightPx);
		console.log(numVisibleChildren);
	}
}
