import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
export declare const attachToMarker: (instance: any, vmb_marker: Deferred<Marker> | null, popup: Popup) => Promise<void>;
export declare const getPopupOptions: (props: Partial<PopupOptions>) => PopupOptions;
export declare const mountPopup: (instance: any | null, vmb_popup: Popup, vmb_marker: Deferred<Marker> | null, vmb_map: Deferred<Map>, content: Ref<any>) => Promise<void>;
//# sourceMappingURL=MapboxPopup.d.ts.map