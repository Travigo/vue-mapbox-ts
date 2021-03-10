import mapboxgl from 'mapbox-gl';
import Deferred from 'my-deferred';
declare const _default: import("vue").DefineComponent<{
    compact: {
        type: BooleanConstructor;
        default: boolean;
    };
    customAttribution: {
        type: () => string | Array<string>;
        default: undefined;
    };
}, {
    vmb_attributionControl: mapboxgl.AttributionControl;
    vmb_map: Deferred<mapboxgl.Map> | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    compact: boolean;
    customAttribution: string | string[];
} & {}>, {
    compact: boolean;
    customAttribution: string | string[];
}>;
export default _default;
