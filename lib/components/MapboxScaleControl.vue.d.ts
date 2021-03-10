import mapboxgl from 'mapbox-gl';
import { ScaleControlUnit } from '../classes/ScaleControl';
import Deferred from 'my-deferred';
declare const _default: import("vue").DefineComponent<{
    maxWidth: {
        type: NumberConstructor;
        default: number;
    };
    unit: {
        type: () => ScaleControlUnit;
        default: string;
    };
}, {
    vmb_scaleControl: mapboxgl.ScaleControl;
    vmb_map: Deferred<mapboxgl.Map> | null;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    maxWidth: number;
    unit: ScaleControlUnit;
} & {}>, {
    maxWidth: number;
    unit: ScaleControlUnit;
}>;
export default _default;
