
export interface INgxLightboxConfig {

    /**
     * @description Allow controls
     * @type boolean
     * @default true
     */
    allowControl?: boolean;

    /**
     * @description Lightbox container animation duration in ms
     * @type number
     * @default 300
     */
    visibleAnimationTime?: number;

    /**
     * @description Size of the place between container border and controls in pixels
     * @type number
     * @default 30
     */
    containerPadding?: number;

    /**
     * @type boolean
     * @default true
     */
    infinite?: boolean;

    /**
     * @type number
     * @default 5
     */
    itemRadius?: number;
}

export interface INgxLightboxItem {
    source: string;
    type: 'image' | 'video' | 'iframe';
    preview?: string;
}
