import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {NGX_LIGHTBOX_CONFIG, NGX_LIGHTBOX_DEFAULT_CONFIG} from './ngx-lightbox.constant';
import {INgxLightboxConfig} from './ngx-lightbox.interface';
import NgxLightboxUtils from './ngx-lightbox.utils';
import {NgxLightboxComponent} from './ngx-lightbox.component';
import {NgxLightboxDirective} from './ngx-lightbox.directive';
import { NgxLightboxDragDirective } from './ngx-lightbox-drag.directive';

@NgModule({
    declarations: [NgxLightboxComponent, NgxLightboxDirective, NgxLightboxDragDirective],
    imports: [
        CommonModule
    ],
    exports: [NgxLightboxComponent, NgxLightboxDirective]
})
export class NgxLightboxModule {

    /**
     * @param {INgxLightboxConfig} config
     * @return {ModuleWithProviders<NgxLightboxModule>}
     */
    static forRoot(config: INgxLightboxConfig = {}): ModuleWithProviders<NgxLightboxModule> {
        return {
            ngModule: NgxLightboxModule,
            providers: [
                { provide: NGX_LIGHTBOX_CONFIG, useValue: NgxLightboxUtils.merge<INgxLightboxConfig>(NGX_LIGHTBOX_DEFAULT_CONFIG, config) }
            ]
        };
    }
}
