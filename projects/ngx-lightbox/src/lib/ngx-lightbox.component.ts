import {
    ApplicationRef,
    Component,
    ComponentRef,
    ElementRef, HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {IInfiniteItemsConfig} from 'projects/ngx-lightbox/src/lib/infinite-items.interface';
import {NgxLightboxItemModel} from './ngx-lightbox-item.model';
import {
    NGX_LIGHTBOX_CLASS_NAMES,
    NGX_LIGHTBOX_CONFIG,
    NGX_LIGHTBOX_CONTENT_PERCENT
} from './ngx-lightbox.constant';
import {INgxLightboxConfig} from './ngx-lightbox.interface';

@Component({
    selector: 'ngx-lightbox',
    templateUrl: './ngx-lightbox.component.html',
    styleUrls: [
        './ngx-lightbox.component.scss'
    ]
})
export class NgxLightboxComponent implements OnInit, OnDestroy {
    @Input() items: NgxLightboxItemModel[] = [];
    @Input() activeItem: NgxLightboxItemModel;
    @ViewChild('contentInnerEl') contentInnerElElement: ElementRef<HTMLElement>;
    viewItems: NgxLightboxItemModel[] = [];
    componentRef: ComponentRef<NgxLightboxComponent>;
    showLightbox = false;
    allowAnimation = false;
    contentInnerOffset: number;
    activeItemIndex: number;
    contentWidthPercent = NGX_LIGHTBOX_CONTENT_PERCENT;
    readonly classNames = NGX_LIGHTBOX_CLASS_NAMES;

    constructor(
        private appRef: ApplicationRef,
        @Inject(NGX_LIGHTBOX_CONFIG) public config: INgxLightboxConfig
    ) {}

    ngOnInit(): void {
        document.body.classList.add(NGX_LIGHTBOX_CLASS_NAMES.Open);
        this.show().then(() => {
            this.setActiveItem();
            window.requestAnimationFrame(() => this.allowAnimation = true);
        });
    }

    ngOnDestroy(): void {
        this.items.forEach(item => {
            item.isActive = false;
            item.pause();
            item.videoElement = null;
        });
    }

    @HostListener('window:resize')
    onResize(): void {
        this.setActiveItem(this.activeItemIndex);
    }

    /**
     * CLose lightbox
     */
    close(): void {
        this.hide().then(() => {
            this.appRef.detachView(this.componentRef.hostView);
            document.body.classList.remove(NGX_LIGHTBOX_CLASS_NAMES.Open);
            this.componentRef.destroy();
        });
    }

    /**
     * Navigate between lightbox items
     * @param {MouseEvent} event
     * @param {"prev" | "next"} direction
     */
    navigate(event: MouseEvent, direction: 'prev' | 'next'): void {
        event.preventDefault();
        event.stopPropagation();

        this.items[this.activeItemIndex].pause();

        switch (direction) {
            case 'prev':
                this.setActiveItem(this.activeItemIndex === 0 ? this.items.length - 1 : --this.activeItemIndex);

                break;

            case 'next':
                this.setActiveItem(this.activeItemIndex === this.items.length - 1 ? 0 : ++this.activeItemIndex);

                break;
        }
    }

    /**
     * Video element loaded
     * @param {HTMLVideoElement} element
     * @param {NgxLightboxItemModel} item
     */
    videoLoaded(element: HTMLVideoElement, item: NgxLightboxItemModel): void {
        item.videoElement = element;

        if (item.isActive) {
            item.play();
        }
    }

    /**
     * Show lightbox container
     * @return {Promise<any>}
     */
    show(): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.showLightbox = true;
                resolve();
            }, 0);
        });
    }

    /**
     * Hide lightbox container
     * @return {Promise<any>}
     */
    hide(): Promise<any> {
        return new Promise(resolve => {
            this.showLightbox = false;
            setTimeout(() => {
                resolve();
            }, this.config.visibleAnimationTime);
        });
    }

    /**
     * @return {IInfiniteItemsConfig}
     */
    getInfiniteItemsConfig(): IInfiniteItemsConfig {

        if (!this.config.infinite) {
            return null;
        }

        return {
            radius: 3,
            currentIndex: this.activeItemIndex
        };
    }

    /**
     * Set active lightbox item
     * @param {number} index
     */
    private setActiveItem(index?: number): void {
        index = (typeof index === 'number') ? index : this.items.findIndex(item => item.id === this.activeItem.id);
        this.activeItemIndex = index;
        if (typeof this.activeItemIndex === 'number') {
            this.items.forEach(item => item.isActive = false);
            this.items[this.activeItemIndex].isActive = true;
            this.items[this.activeItemIndex].play();
            this.contentInnerOffset = this.getContentOffset(this.activeItemIndex);
        }
    }

    /**
     * Get content inner transform offset
     * @param {number} index
     * @return {number}
     */
    private getContentOffset(index: number): number {
        const contentWidth = Math.ceil(document.body.clientWidth * (this.contentWidthPercent / 100));
        return index * contentWidth + (index * this.config.containerPadding);
    }
}
