<template>
<div :style="style" ref="root" class="mapbox-map">
  <div v-if="vmb_map.isResolved" ref="mapContainer" class="map-container" :style="{ height, width }">
    <slot />
  </div>
  <div v-else>
    <slot name="loader">
      <div :style="style" />
    </slot>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, provide, ref, watch, UnwrapRef, Ref } from 'vue';
import mapboxgl, { LngLatBounds, LngLatLike, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { registerMapEvents, getStyle, mountMap, MapEmits, updateStyle, mapWatcher } from '../services/MapboxMap';
import { FlyToOptions } from '../classes/MapboxMap';
import vmodel from '../services/helpers/vmodel';

export default defineComponent({
  name: 'MapboxMap',
  emits: MapEmits,
  props: {
    accessToken: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    container: {
      type: [ Object, String ] as any as () => HTMLElement || String,
      default: ''
    },
    minZoom: {
      type: Number,
      default: 0,
    },
    maxZoom: {
      type: Number,
      default: 22,
    },
    minPitch: {
      type: Number,
      default: 0,
    },
    maxPitch: {
      type: Number,
      default: 60,
    },
    mapStyle: {
      type: [Object, String] as any as () => Record<string, any> | string,
      default: 'mapbox://styles/mapbox/streets-v11'
    },
    hash: {
      type: Boolean,
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    bearingSnap: {
      type: Number,
    },
    pitchWithRotate: {
      type: Boolean,
      default: true
    },
    clickTolerance: {
      type: Number,
    },
    attributionControl: {
      type: Boolean,
      default: true
    },
    customAttribution: {
      type: Array as () => string | Array<any> | null,
    },
    logoPosition: {
      type: String,
      default: 'bottom-left',
    },
    failIfMajorPerformanceCaveat: {
      type: Boolean,
    },
    preserveDrawingBuffer: {
      type: Boolean,
    },
    antialias: {
      type: Boolean,
    },
    refreshExpiredTiles: {
      type: Boolean,
    },
    maxBounds: {
      type: [Array, Object] as any as () => LngLatLike,
    },
    scrollZoom: {
      type: [ Boolean, Object ],
      default: true
    },
    boxZoom: {
      type: Boolean,
    },
    dragRotate: {
      type: Boolean,
      default: true
    },
    dragPan: {
      type: [Object, Boolean] as any as () => boolean | Record<string, any>,
      default: true
    },
    keyboard: {
      type: Boolean,
    },
    doubleClickZoom: {
      type: Boolean,
    },
    touchZoomRotate: {
      type: [Boolean, Object] as any as () => boolean | Record<string, any>,
      default: true
    },
    trackResize: {
      type: Boolean,
      default: true
    },
    center: {
      default: () => [ 0, 0 ] as [number, number],
    },
    zoom: {
      type: Number,
    },
    bearing: {
      type: Number,
    },
    pitch: {
      type: Number,
    },
    bounds: {
      type: Array as any as () => LngLatBounds | Array<number>,
    },
    fitBoundsOptions: {
      type: Object,
    },
    renderWorldCopies: {
      type: Boolean,
      default: true,
    },
    maxTileCacheSize: {
      type: Number,
      default: null,
    },
    localIdeographFontFamily: {
      type: String,
      default: 'sans-serif',
    },
    transformRequest: {
      type: Function,
      default: null,
    },
    collectResourceTiming: {
      type: Boolean,
      default: false,
    },
    fadeDuration: {
      type: Number,
      default: 300,
    },
    crossSourceCollisions: {
      type: Boolean,
      default: true,
    },
    zoomLogo: {
      type: Number,
      default: 1
    },
    flyToOptions: {
      default: () => ({ } as FlyToOptions)
    },
    autoResize: {
      type: Boolean,
      default: false
    },
    autoResizeDelay: {
      type: Number
    },
    cooperativeGestures: {
      type: Boolean,
      default: false
    }
  },
  setup: (props) => {
    const root:Ref<null|HTMLElement> = ref(null);
    const mapContainer:Ref<null|HTMLElement> = ref(null);
    const vmb_map = new Deferred<Map>();
    provide('vmb_map', vmb_map);

    const i_center = vmodel<LngLatLike, UnwrapRef<LngLatLike>>(props, 'update:center', 'center');    
    const i_flyToOptions = vmodel<FlyToOptions, UnwrapRef<FlyToOptions>> (props, 'update:flyToOptions', 'flyToOptions');

    const style = ref(getStyle(props));

    watch(props, async p => {
      updateStyle(p, style);
    });

    mapWatcher(vmb_map, props, { center: i_center, flyToOptions: i_flyToOptions });
    

    onMounted(async () => {
      const instance = getCurrentInstance();
      mapboxgl.accessToken = props.accessToken;
      mountMap(props as any, vmb_map, mapContainer, root);
      if(instance)
        await registerMapEvents(vmb_map, instance);
    });
    

    onUnmounted(async () => {
      const map = await vmb_map.promise;
      map.remove();
    });

    return {
      vmb_map,
      root,
      style,
      i_center,
      i_flyToOptions,
      mapContainer
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.mapboxgl-ctrl-logo) {
  zoom: var(--zoom-logo);
}
</style>
