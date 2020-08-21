import {Component} from '@angular/core';
import {NgxLightboxItemModel} from 'projects/ngx-lightbox/src/lib/ngx-lightbox-item.model';

@Component({
    selector: 'ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    items = [
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=0',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=1',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=2',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=3',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=4',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=5',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'https://picsum.photos/1920/1080?cache=6',
            type: 'image'
        }),
        new NgxLightboxItemModel({
            source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            preview: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Big.Buck.Bunny.-.Frank.Bunny.png',
            type: 'video'
        })
    ];
}
