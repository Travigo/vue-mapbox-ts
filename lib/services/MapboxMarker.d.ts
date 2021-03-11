import LngLatInput from '@/classes/LngLatInput';
import mapboxgl, { Map, Marker, MarkerOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref, ComponentInternalInstance } from 'vue';
export declare const parentIsMarker: (instance: any, vmb_marker?: Deferred<mapboxgl.Marker> | null | undefined) => Promise<boolean>;
export declare const mountMarker: (options: MarkerOptions, vmb_map: Deferred<Map>, vmb_marker: Deferred<Marker>, instance: ComponentInternalInstance, lngLat: LngLatInput, element?: Ref<HTMLElement> | undefined) => Promise<void>;
//# sourceMappingURL=MapboxMarker.d.ts.map