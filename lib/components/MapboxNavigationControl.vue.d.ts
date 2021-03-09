import mapboxgl from 'mapbox-gl';
import Deferred from 'my-deferred';
import { NavigationControlPosition } from '@/classes/NavigationControll';
declare const _default: import("vue").DefineComponent<{
    showCompass: {
        type: BooleanConstructor;
        default: boolean;
    };
    showZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    visualizePitch: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: () => NavigationControlPosition;
        default: () => string;
    };
}, {
    vmb_map: Deferred<mapboxgl.Map>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    showCompass: boolean;
    showZoom: boolean;
    visualizePitch: boolean;
    position: NavigationControlPosition;
} & {}>, {
    showCompass: boolean;
    showZoom: boolean;
    visualizePitch: boolean;
    position: NavigationControlPosition;
}>;
export default _default;
