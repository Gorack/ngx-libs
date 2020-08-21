import {INgxLightboxItem} from './ngx-lightbox.interface';
import NgxLightboxUtils from './ngx-lightbox.utils';

export class NgxLightboxItemModel implements INgxLightboxItem {
    source: string;
    type: 'image' | 'video' | 'iframe';
    preview: string;
    id: number;
    isActive: boolean;
    videoElement: HTMLVideoElement;

    constructor(json: INgxLightboxItem) {
        NgxLightboxUtils.parse(this, json);
        this.id = Math.round(+new Date() * Math.random());
        this.isActive = false;

        if (!this.preview) {
            this.preview = this.source;
        }
    }

    play(): void {
        if (this.videoElement) {
            this.videoElement.play();
        }
    }

    pause(): void {
        if (this.videoElement) {
            this.videoElement.pause();
        }
    }
}
