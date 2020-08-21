import {InjectionToken} from '@angular/core';
import {INgxLightboxConfig} from './ngx-lightbox.interface';

export const NGX_LIGHTBOX_CLASS_PREFIX = 'ngx-lightbox';
export const NGX_LIGHTBOX_CONFIG = new InjectionToken('ngxLightboxConfig');
export const NGX_LIGHTBOX_CONTENT_PERCENT = 85;

export const NGX_LIGHTBOX_DEFAULT_CONFIG: INgxLightboxConfig = {
    allowControl: true,
    visibleAnimationTime: 300,
    containerPadding: 30,
    infinite: true,
    itemRadius: 5
};

export const NGX_LIGHTBOX_CLASS_NAMES = {
    Open: `${NGX_LIGHTBOX_CLASS_PREFIX}-open`,
    Container: `${NGX_LIGHTBOX_CLASS_PREFIX}-container`,
    Content: `${NGX_LIGHTBOX_CLASS_PREFIX}-content`,
    Controls: `${NGX_LIGHTBOX_CLASS_PREFIX}-controls`,
    ContentInner: `${NGX_LIGHTBOX_CLASS_PREFIX}-content__inner`,
    Item: `${NGX_LIGHTBOX_CLASS_PREFIX}-item`
};
