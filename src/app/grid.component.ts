import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

const itemHeightPx = 30;
const throttleTimeMs = 100;

@Component({
  selector: 'grid',
  template: `
  	<ul #gridContainer class="grid">
		<div #topBookend></div>
		<li *ngFor="let item of visibleItems" [ngClass]="{'even': item.index % 2 === 0}">
			{{ item.label }}
		</li>
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

		// Observe the scroll event on the grid container.
		const scrollEventStream = Observable.fromEvent(this.gridContainer.nativeElement, 'scroll')
			.throttleTime(throttleTimeMs);
		
		// Subscribe to the scroll event, recalculate visible elements and bookend heights.
		scrollEventStream.subscribe(_ => {
			const scrollTopPx = this.gridContainer.nativeElement.scrollTop;
			
			// Calculate the index of the first visible element, depending on how far we've scrolled.
			// Then, set visible items.
			const firstVisibleElementIndex = Math.floor(scrollTopPx / itemHeightPx);
			this.visibleItems = this.items.slice(firstVisibleElementIndex, firstVisibleElementIndex + numVisibleChildren);
			
			// Top bookend height is same as scroll top.
			this.topBookend.nativeElement.style.height = `${scrollTopPx}px`;
			
			// Bottom bookend height is total height - height of items - scroll top.
			const bottomBookendHeightPx = (this.items.length - numVisibleChildren) * itemHeightPx - scrollTopPx;
			this.bottomBookend.nativeElement.style.height = `${bottomBookendHeightPx}px`;

			// Detect changes.
			this.cdr.detectChanges();
		});
	}
}
