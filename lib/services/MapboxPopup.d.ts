import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
import { ComponentInternalInstance } from 'vue';
import { MapboxPopupInput } from '../classes/Popup';
import { GeogeometryPaintType } from '../classes/Geogeometry.Paint';
export declare const attachToMarker: (instance: any, vmb_marker: Deferred<Marker> | null, popup: Popup) => Promise<void>;
export declare const attachToGeogeometry: (vmb_map: Deferred<Map>, vmb_geo_paint: Deferred<GeogeometryPaintType>, popup: Popup) => Promise<void>;
export declare const getPopupOptions: (props: Partial<PopupOptions>) => PopupOptions;
export declare const mountPopup: (instance: any | null, vmb_map: Deferred<Map>, vmb_popup: Popup, vmb_marker: Deferred<Marker> | null, vmb_geogeometry_paint: Deferred<GeogeometryPaintType> | null, content: Ref<any>) => Promise<void>;
export declare const PopupGlEvents: string[];
export declare const PopupEmits: string[];
export declare const registerPopupEvents: (vmb_popup: Popup, instance: ComponentInternalInstance) => void;
export declare const updatePopup: (props: MapboxPopupInput, vmb_popup: Popup) => Promise<void>;
//# sourceMappingURL=MapboxPopup.d.ts.map