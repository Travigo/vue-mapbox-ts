import { Ref } from 'vue';
import mapboxgl, { Anchor } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import LngLatInput from '../classes/LngLatInput';
declare const _default: import("vue").DefineComponent<{
    lngLat: {
        default: () => LngLatInput;
    };
    closeButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnMove: {
        type: BooleanConstructor;
        default: boolean;
    };
    anchor: {
        type: () => Anchor;
        default: undefined;
    };
    offset: {
        type: () => mapboxgl.Offset;
        default: undefined;
    };
    className: {
        type: StringConstructor;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    renderless: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    vmb_marker: Deferred<mapboxgl.Marker> | null;
    vmb_popup: mapboxgl.Popup;
    popupOptions: mapboxgl.PopupOptions;
    content: Ref<any>;
    defaultContent: Ref<any>;
    vmb_map: Deferred<mapboxgl.Map>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    lngLat: LngLatInput;
    closeButton: boolean;
    closeOnClick: boolean;
    closeOnMove: boolean;
    anchor: mapboxgl.Anchor;
    offset: mapboxgl.Offset;
    maxWidth: string;
    renderless: boolean;
} & {
    className?: string | undefined;
}>, {
    lngLat: LngLatInput;
    closeButton: boolean;
    closeOnClick: boolean;
    closeOnMove: boolean;
    anchor: mapboxgl.Anchor;
    offset: mapboxgl.Offset;
    maxWidth: string;
    renderless: boolean;
}>;
export default _default;
