import mapboxgl, { LngLat, LngLatBounds } from 'mapbox-gl';
import Deferred from 'my-deferred';
declare const _default: import("vue").DefineComponent<{
    accessToken: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: () => HTMLElement;
        default: string;
    };
    minZoom: {
        type: NumberConstructor;
        default: number;
    };
    maxZoom: {
        type: NumberConstructor;
        default: number;
    };
    minPitch: {
        type: NumberConstructor;
        default: number;
    };
    maxPitch: {
        type: NumberConstructor;
        default: number;
    };
    mapStyle: {
        type: () => Record<string, any> | string;
        default: string;
    };
    hash: {
        type: BooleanConstructor;
        default: boolean;
    };
    interactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    bearingSnap: {
        type: NumberConstructor;
        default: number;
    };
    pitchWithRotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    clickTolerance: {
        type: NumberConstructor;
        default: number;
    };
    attributionControl: {
        type: BooleanConstructor;
        default: boolean;
    };
    customAttribution: {
        type: () => string | Array<any> | null;
        default: null;
    };
    logoPosition: {
        type: StringConstructor;
        default: string;
    };
    failIfMajorPerformanceCaveat: {
        type: BooleanConstructor;
        default: boolean;
    };
    preserveDrawingBuffer: {
        type: BooleanConstructor;
        default: boolean;
    };
    antialias: {
        type: BooleanConstructor;
        default: boolean;
    };
    refreshExpiredTiles: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxBounds: {
        type: () => LngLatBounds | Array<any>;
        default: undefined;
    };
    scrollZoom: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: boolean;
    };
    boxZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragRotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    dragPan: {
        type: () => boolean | Record<string, any>;
        default: boolean;
    };
    keyboard: {
        type: BooleanConstructor;
        default: boolean;
    };
    doubleClickZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    touchZoomRotate: {
        type: () => boolean | Record<string, any>;
        default: boolean;
    };
    trackResize: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: () => LngLat | [number, number] | Record<string, any>;
        default: () => number[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    bearing: {
        type: NumberConstructor;
        default: number;
    };
    pitch: {
        type: NumberConstructor;
        default: number;
    };
    bounds: {
        type: () => LngLatBounds | Array<number>;
        default: undefined;
    };
    fitBoundsOptions: {
        type: ObjectConstructor;
        default: null;
    };
    renderWorldCopies: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxTileCacheSize: {
        type: NumberConstructor;
        default: null;
    };
    localIdeographFontFamily: {
        type: StringConstructor;
        default: string;
    };
    transformRequest: {
        type: FunctionConstructor;
        default: null;
    };
    collectResourceTiming: {
        type: BooleanConstructor;
        default: boolean;
    };
    fadeDuration: {
        type: NumberConstructor;
        default: number;
    };
    crossSourceCollisions: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideLogo: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideAttribution: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    vmb_map: Deferred<mapboxgl.Map>;
    root: import("vue").Ref<null>;
}, unknown, {
    style(): Record<string, string | number>;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    accessToken: string;
    height: string;
    width: string;
    container: HTMLElement;
    minZoom: number;
    maxZoom: number;
    minPitch: number;
    maxPitch: number;
    mapStyle: string | Record<string, any>;
    hash: boolean;
    interactive: boolean;
    bearingSnap: number;
    pitchWithRotate: boolean;
    clickTolerance: number;
    attributionControl: boolean;
    customAttribution: string | any[] | null;
    logoPosition: string;
    failIfMajorPerformanceCaveat: boolean;
    preserveDrawingBuffer: boolean;
    antialias: boolean;
    refreshExpiredTiles: boolean;
    maxBounds: any[] | mapboxgl.LngLatBounds;
    scrollZoom: boolean;
    boxZoom: boolean;
    dragRotate: boolean;
    dragPan: boolean | Record<string, any>;
    keyboard: boolean;
    doubleClickZoom: boolean;
    touchZoomRotate: boolean | Record<string, any>;
    trackResize: boolean;
    center: Record<string, any> | mapboxgl.LngLat | [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
    bounds: mapboxgl.LngLatBounds | number[];
    fitBoundsOptions: Record<string, any>;
    renderWorldCopies: boolean;
    maxTileCacheSize: number;
    localIdeographFontFamily: string;
    transformRequest: Function;
    collectResourceTiming: boolean;
    fadeDuration: number;
    crossSourceCollisions: boolean;
    hideLogo: boolean;
    hideAttribution: boolean;
} & {}>, {
    accessToken: string;
    height: string;
    width: string;
    container: HTMLElement;
    minZoom: number;
    maxZoom: number;
    minPitch: number;
    maxPitch: number;
    mapStyle: string | Record<string, any>;
    hash: boolean;
    interactive: boolean;
    bearingSnap: number;
    pitchWithRotate: boolean;
    clickTolerance: number;
    attributionControl: boolean;
    customAttribution: string | any[] | null;
    logoPosition: string;
    failIfMajorPerformanceCaveat: boolean;
    preserveDrawingBuffer: boolean;
    antialias: boolean;
    refreshExpiredTiles: boolean;
    maxBounds: any[] | mapboxgl.LngLatBounds;
    scrollZoom: boolean;
    boxZoom: boolean;
    dragRotate: boolean;
    dragPan: boolean | Record<string, any>;
    keyboard: boolean;
    doubleClickZoom: boolean;
    touchZoomRotate: boolean | Record<string, any>;
    trackResize: boolean;
    center: Record<string, any> | mapboxgl.LngLat | [number, number];
    zoom: number;
    bearing: number;
    pitch: number;
    bounds: mapboxgl.LngLatBounds | number[];
    fitBoundsOptions: Record<string, any>;
    renderWorldCopies: boolean;
    maxTileCacheSize: number;
    localIdeographFontFamily: string;
    transformRequest: Function;
    collectResourceTiming: boolean;
    fadeDuration: number;
    crossSourceCollisions: boolean;
    hideLogo: boolean;
    hideAttribution: boolean;
}>;
export default _default;
