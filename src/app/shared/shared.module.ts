import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NGX_LIGHTBOX_CONFIG} from 'projects/ngx-lightbox/src/lib/ngx-lightbox.constant';
import {NgxLightboxModule} from 'projects/ngx-lightbox/src/lib/ngx-lightbox.module';

const modules = [

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ...modules,
        NgxLightboxModule.forRoot({
            allowControl: false
        })
    ],
    exports: [
        ...modules,
        NgxLightboxModule
    ]
})
export class SharedModule {}
