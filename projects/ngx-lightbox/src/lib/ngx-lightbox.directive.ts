import {
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Injector,
    Input,
    OnInit
} from '@angular/core';
import {NgxLightboxItemModel} from './ngx-lightbox-item.model';
import {NgxLightboxComponent} from './ngx-lightbox.component';

@Directive({
    selector: '[ngxLightbox]'
})
export class NgxLightboxDirective implements OnInit {
    @Input() items: NgxLightboxItemModel[];
    @Input() ngxLightbox: NgxLightboxItemModel;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    ngOnInit(): void {
        this.initElementStyle();
    }

    @HostListener('click')
    onClick(): void {
        this.appendComponentToBody(NgxLightboxComponent);
    }

    appendComponentToBody(component: any): void {
        // 1. Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory<NgxLightboxComponent>(component)
            .create(this.injector);

        componentRef.instance.items = this.items ? this.items : [this.ngxLightbox];
        componentRef.instance.activeItem = this.ngxLightbox;
        componentRef.instance.componentRef = componentRef;

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(domElem);
    }

    initElementStyle(): void {
        this.elementRef.nativeElement.style.cursor = 'pointer';
    }
}
