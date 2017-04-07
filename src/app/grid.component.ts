import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

const itemHeightPx = 30;

@Component({
  selector: 'grid',
  template: `
  	<ul #gridContainer class="grid">
		<div #topBookend></div>
		<li *ngFor="let item of visibleItems">{{ item.label }}</li>
		<div #bottomBookend></div>
  	</ul>
  `,
})
export class GridComponent  {
	@Input() items: any[];
	
	@ViewChild("gridContainer") gridContainer: ElementRef;
	@ViewChild("topBookend") topBookend: ElementRef;
	@ViewChild("bottomBookend") bottomBookend: ElementRef;

	visibleItems: any[] = [];

	constructor(private cdr: ChangeDetectorRef) { }

	ngAfterViewInit() {
		// Figure out container height and the number of visible children.
		const containerHeightPx = this.gridContainer.nativeElement.clientHeight;
		const numVisibleChildren = Math.ceil(containerHeightPx / itemHeightPx);

		// Extract visible children.
		this.visibleItems = this.items.slice(0, numVisibleChildren);

		// Set bottom bookend height.
		const bottomBookendHeightPx = (this.items.length - numVisibleChildren) * itemHeightPx;
		this.bottomBookend.nativeElement.style.height = `${bottomBookendHeightPx}px`;

		// Tell Angular that we changed some bindings.
		this.cdr.detectChanges();
	}
}
