import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
import { GeogeometryType } from '../classes/Geogeomerty';
export declare const attachToMarker: (instance: any, vmb_marker: Deferred<Marker> | null, popup: Popup) => Promise<void>;
export declare const attachToGeogeometry: (vmb_map: Deferred<Map>, vmb_geo: GeogeometryType | null, popup: Popup) => Promise<void>;
export declare const getPopupOptions: (props: Partial<PopupOptions>) => PopupOptions;
export declare const mountPopup: (instance: any | null, vmb_map: Deferred<Map>, vmb_popup: Popup, vmb_marker: Deferred<Marker> | null, vmb_geogeometry: GeogeometryType | null, content: Ref<any>) => Promise<void>;
//# sourceMappingURL=MapboxPopup.d.ts.map