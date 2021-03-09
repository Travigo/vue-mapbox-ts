import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { ComponentInternalInstance, Ref } from 'vue';
export declare const parentIsMarker: (instance: any) => boolean;
export declare const attachToMarker: (instance: any, vmb_marker: Deferred<Marker> | null, popup: Popup) => Promise<void>;
export declare const getPopupOptions: (props: Partial<PopupOptions>) => PopupOptions;
export declare const mountPopup: (instance: ComponentInternalInstance | null, vmb_popup: Popup, vmb_marker: Deferred<Marker> | null, vmb_map: Deferred<Map>, content: Ref<any>) => Promise<void>;
