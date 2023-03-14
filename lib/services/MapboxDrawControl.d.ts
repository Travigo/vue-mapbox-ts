import { Map } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Deferred from 'my-deferred/dist/src';
import { DrawControlOptions } from '../classes/DrawControl';
import { ComponentInternalInstance } from 'vue';
export declare const getDrawControlOptions: (props: DrawControlOptions) => DrawControlOptions;
export declare const mapDrawEvents: (vmb_map: Map, component: ComponentInternalInstance) => void;
export declare const mountDrawControl: (vmb_map: Deferred<Map>, vmb_drawControl: MapboxDraw, opts: DrawControlOptions, component: ComponentInternalInstance) => Promise<void>;
//# sourceMappingURL=MapboxDrawControl.d.ts.map