import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
    selector: '[ngxLightboxDrag]'
})
export class NgxLightboxDragDirective implements OnInit {
    dragPosition: number;
    dragActive = false;
    latestDragPosition = 0;

    constructor(
        private elementRef: ElementRef<HTMLElement>
    ) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.classList.add('drag');
    }

    @HostListener('mousedown', ['$event'])
    dragStart(event: MouseEvent): boolean {
        event.preventDefault();
        event.stopPropagation();
        this.dragActive = true;
        this.dragPosition = event.x;
        this.elementRef.nativeElement.classList.add('dragging');

        return false;
    }

    @HostListener('mousemove', ['$event'])
    dragging(event: MouseEvent): void {
        if (this.dragActive) {
            this.elementRef.nativeElement.style.transform = `translate(${this.getDragDiff(event.x)}px)`;
        }
    }

    @HostListener('mouseup', ['$event'])
    dragStop(event: MouseEvent): boolean {
        event.preventDefault();
        event.stopPropagation();
        this.dragActive = false;
        this.latestDragPosition = this.getDragDiff(event.x);
        this.elementRef.nativeElement.classList.remove('dragging');

        return false;
    }

    private getDragDiff(position: number): number {
        return position - this.dragPosition + this.latestDragPosition;
    }
}
