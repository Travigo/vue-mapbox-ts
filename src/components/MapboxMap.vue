<template>
<div :style="style">
  <div v-if="vmb_map.isResolved" ref="root" :style="style">
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
import { defineComponent, getCurrentInstance, onMounted, provide, ref, SetupContext } from 'vue';
import { _instance } from '../install';
import mapboxgl, { LngLat, LngLatBounds, Map, MapboxOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import mountMap from '../services/MapboxMap.moutMap';

export default defineComponent({
  name: 'MapboxMap',
  props: {
    accessToken: {
      type: String,
      default: ''
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
      type: [Object, Array] as any as () => LngLat | [number, number] | Record<string, any>,
      default: () => [ 0, 0 ],
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
    hideAttribution: {
      type: Boolean,
      default: false
    }
  },
  setup: (props:any, stuff:any) => {
    console.log('SETUP');
    const instance = getCurrentInstance();
    console.log(_instance);
    console.log(instance);
    const root = ref(null);
    const vmb_map = new Deferred<Map>();
    
    provide('vmb_map', vmb_map);

    onMounted(() => {
      console.log('MOUNTED');
      console.log(getCurrentInstance());
      mapboxgl.accessToken = props.accessToken;
      mountMap(props, vmb_map, root);
    });

    return {
      vmb_map, root
    };
  },
  computed: {
    style(): any{
      return {
        height: (this as any).height,
        width: (this as any).width,
        '--zoom-logo': (this as any).zoomLogo >= 0.8 ? (this as any).zoomLogo : 1,
        '--display-attrib': (this as any).hideAttribution ? 'none' : 'block'
      } as any;
    }
  }
});
</script>

<style lang="scss" scoped>
:deep(.mapboxgl-ctrl-logo) {
  zoom: var(--zoom-logo);
}

:deep(.mapboxgl-ctrl.mapboxgl-ctrl-attrib:last-child){
  display: var(--display-attrib)
}

</style>

// @mixin hide-logo($hide-logo){
//   @if $hide-logo{
//     display:none;
//   }
// }

