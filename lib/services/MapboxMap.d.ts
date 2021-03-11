import { MapboxOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
import { MapboxMapInput } from '../classes/MapboxMap';
export declare const getStyle: (props: any) => Ref<{
    height: any;
    width: any;
    '--zoom-logo': any;
}>;
export declare const getMapStyle: (raw: string) => string;
export declare const getMapboxOptions: (props: MapboxMapInput, el: any) => MapboxOptions;
export declare const mountMap: (props: MapboxMapInput, vmb_map: Deferred<Map>, rootRef: Ref<any>) => void;
//# sourceMappingURL=MapboxMap.d.ts.map