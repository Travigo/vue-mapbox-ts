import { Map } from 'mapbox-gl';
import { Ref, UnwrapRef } from 'vue';
export declare function enableAutoResize(rootContainerRef: Ref<HTMLElement | null>, map: Map, autoResizeDelay?: number): void;
export declare function enableTouchZoomRotate(map: Map, touchZoomRotate: Ref<boolean>): void;
export declare function enableAutoResizeWithResizeObserver(rootContainerRef: Ref<HTMLElement | null>, map: Map): void;
export declare function enableAutoResizeWithEventListener(watchedRef: Ref<HTMLElement | null>, autoResizeDelay?: number): UnwrapRef<DOMRect>;
//# sourceMappingURL=index.d.ts.map