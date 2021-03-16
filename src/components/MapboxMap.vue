<template>
<div :style="style">
  <div v-if="vmb_map.isResolved" ref="root" :style="{height: '100%', width: '100%' }">
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
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import mapboxgl, { LngLatBounds, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { registerMapEvents, getStyle, mountMap, updateMap, MapEmits, updateStyle } from '../services/MapboxMap';
import { MapboxMapInput, FlyToOptions } from '../classes/MapboxMap';

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
      default: '500px'
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
      default: false,
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    bearingSnap: {
      type: Number,
      default: 7,
    },
    pitchWithRotate: {
      type: Boolean,
      default: true,
    },
    clickTolerance: {
      type: Number,
      default: 3,
    },
    attributionControl: {
      type: Boolean,
      default: true,
    },
    customAttribution: {
      type: Array as () => string | Array<any> | null,
      default: null,
    },
    logoPosition: {
      type: String,
      default: 'bottom-left',
    },
    failIfMajorPerformanceCaveat: {
      type: Boolean,
      default: false,
    },
    preserveDrawingBuffer: {
      type: Boolean,
      default: false,
    },
    antialias: {
      type: Boolean,
      default: false,
    },
    refreshExpiredTiles: {
      type: Boolean,
      default: true,
    },
    maxBounds: {
      type: Array as () => LngLatBounds | Array<any>,
      default: undefined,
    },
    scrollZoom: {
      type: [ Boolean, Object ],
      default: true,
    },
    boxZoom: {
      type: Boolean,
      default: true,
    },
    dragRotate: {
      type: Boolean,
      default: true,
    },
    dragPan: {
      type: [Object, Boolean] as any as () => boolean | Record<string, any>,
      default: true,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    doubleClickZoom: {
      type: Boolean,
      default: true,
    },
    touchZoomRotate: {
      type: [Boolean, Object] as any as () => boolean | Record<string, any>,
      default: true,
    },
    trackResize: {
      type: Boolean,
      default: true,
    },
    center: {
      default: () => [ 0, 0 ] as [number, number],
    },
    zoom: {
      type: Number,
      default: 0,
    },
    bearing: {
      type: Number,
      default: 0,
    },
    pitch: {
      type: Number,
      default: 0,
    },
    bounds: {
      type: Array as any as () => LngLatBounds | Array<number>,
      default: undefined,
    },
    fitBoundsOptions: {
      type: Object,
      default: null,
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
    }
  },
  setup: (props:any) => {
    const root = ref(null);
    const vmb_map = new Deferred<Map>();
    provide('vmb_map', vmb_map);

    const style = ref(getStyle(props));

    onMounted(async () => {
      const instance = getCurrentInstance();
      mapboxgl.accessToken = props.accessToken;
      mountMap(props, vmb_map, root);
      if(instance)
        await registerMapEvents(vmb_map, instance);
    });

    watch(props, async p => {
      console.log('UPDATED MAP');
      updateMap(vmb_map, p as any as MapboxMapInput, root);
      updateStyle(p, style);
    });

    onUnmounted(async () => {
      const map = await vmb_map.promise;
      map.remove();
    });

    

    return {
      vmb_map, root, style
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.mapboxgl-ctrl-logo) {
  zoom: var(--zoom-logo);
}
</style>