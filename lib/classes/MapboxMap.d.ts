import { UnwrapRef } from 'vue';
import { MapboxOptions } from 'mapbox-gl';
export interface DivStyle {
    height: string;
    width: string;
    '--zoom-logo': number;
}
export interface MapboxMapInput extends MapboxOptions {
    mapStyle: string;
    accessToken: string;
    height: string;
    width: string;
    flyToOptions: UnwrapRef<FlyToOptions>;
    autoResize: boolean;
    autoResizeDelay?: number;
    touchZoomRotate: boolean;
}
export interface FlyToOptions {
    curve?: number;
    minZoom?: number;
    speed?: number;
    screenSpeed?: number;
    maxDuration?: number;
}
//# sourceMappingURL=MapboxMap.d.ts.map