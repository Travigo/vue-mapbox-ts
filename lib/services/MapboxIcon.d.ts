import { Icon, IconOptions } from '@/classes/Icon';
import { Map, Marker } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { ComponentInternalInstance } from 'vue';
export declare const getMapboxIconOptions: (props: IconOptions) => IconOptions;
export declare const mountMapboxIcon: (icon: Icon, vmb_map: Deferred<Map>, vmb_marker: Deferred<Marker> | null, instance: ComponentInternalInstance) => Promise<void>;
//# sourceMappingURL=MapboxIcon.d.ts.map