import LngLatInput from '../classes/LngLatInput';
import mapboxgl, { Map, Marker, MarkerOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { ComponentInternalInstance } from 'vue';
import { Ref } from 'vue';
import { MarkerProps } from '../classes/Marker';
export declare const parentIsMarker: (instance: any) => boolean;
export declare const getMarkerOptions: (props: MarkerOptions) => MarkerOptions;
export declare const MarkerGlEvents: string[];
export declare const MarkerEmits: string[];
export declare const registerMarkerEvents: (marker: mapboxgl.Marker, component: ComponentInternalInstance) => void;
export declare const updateMarker: (props: MarkerProps, vmb_marker: Deferred<Marker>) => Promise<void>;
export declare const mountMarker: (options: MarkerOptions, vmb_map: Deferred<Map>, vmb_marker: Deferred<Marker>, instance: ComponentInternalInstance, lngLat: LngLatInput, element?: Ref<HTMLElement>) => Promise<void>;
export declare const updateOffset: (vmb_marker: Deferred<Marker>, color: string) => Promise<void>;
//# sourceMappingURL=MapboxMarker.d.ts.map