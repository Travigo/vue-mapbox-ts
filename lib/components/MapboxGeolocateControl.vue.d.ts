import mapboxgl, { FitBoundsOptions, PositionOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
declare const _default: import("vue").DefineComponent<{
    positionOptions: {
        type: () => PositionOptions;
        default: () => {
            enableHighAccuracy: boolean;
            timeout: number;
        };
    };
    fitBoundsOptions: {
        type: () => FitBoundsOptions;
        default: () => {
            maxZoom: number;
        };
    };
    trackUserLocation: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAccuracyCircle: {
        type: BooleanConstructor;
        default: boolean;
    };
    showUserLocation: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    vmb_map: Deferred<mapboxgl.Map>;
    vmb_geolocationControl: mapboxgl.GeolocateControl;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    positionOptions: mapboxgl.PositionOptions;
    fitBoundsOptions: mapboxgl.FitBoundsOptions;
    trackUserLocation: boolean;
    showAccuracyCircle: boolean;
    showUserLocation: boolean;
} & {}>, {
    positionOptions: mapboxgl.PositionOptions;
    fitBoundsOptions: mapboxgl.FitBoundsOptions;
    trackUserLocation: boolean;
    showAccuracyCircle: boolean;
    showUserLocation: boolean;
}>;
export default _default;
