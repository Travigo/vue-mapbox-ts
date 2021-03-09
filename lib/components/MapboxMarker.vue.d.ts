import { Ref } from 'vue';
import mapboxgl, { PointLike, Anchor, Alignment } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import LngLatInput from '../classes/LngLatInput';
declare const _default: import("vue").DefineComponent<{
    lngLat: {
        default: () => LngLatInput;
    };
    element: {
        type: {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
        default: null;
    };
    offset: {
        type: () => PointLike;
        default: () => [number, number];
    };
    anchor: {
        type: () => Anchor;
        default: () => string;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    scale: {
        type: NumberConstructor;
        default: number;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotation: {
        type: NumberConstructor;
        default: number;
    };
    pitchAlignment: {
        type: () => Alignment;
        default: string;
    };
    rotationAlignment: {
        type: () => Alignment;
        default: string;
    };
}, {
    vmb_map: Deferred<mapboxgl.Map>;
    vmb_marker: Deferred<mapboxgl.Marker>;
    i_lngLat: Ref<[number, number]>;
    i_popups: Ref<import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    lngLat: LngLatInput;
    element: HTMLElement;
    offset: mapboxgl.PointLike;
    anchor: mapboxgl.Anchor;
    color: string;
    scale: number;
    draggable: boolean;
    rotation: number;
    pitchAlignment: mapboxgl.Alignment;
    rotationAlignment: mapboxgl.Alignment;
} & {}>, {
    lngLat: LngLatInput;
    element: HTMLElement;
    offset: mapboxgl.PointLike;
    anchor: mapboxgl.Anchor;
    color: string;
    scale: number;
    draggable: boolean;
    rotation: number;
    pitchAlignment: mapboxgl.Alignment;
    rotationAlignment: mapboxgl.Alignment;
}>;
export default _default;
