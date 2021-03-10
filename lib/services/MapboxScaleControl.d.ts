import { ScaleControlOptions } from '../classes/ScaleControl';
import { ScaleControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
export declare const getScaleControlOptions: (props: ScaleControlOptions) => ScaleControlOptions;
export declare const mountScaleControl: (vmb_map: Deferred<Map>, vmb_scaleControl: ScaleControl) => Promise<void>;
