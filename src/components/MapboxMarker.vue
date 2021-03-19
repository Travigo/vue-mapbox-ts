<template>
<div>
  <div ref="icon">
    <slot name="icon">
        <svg display="block" :height="42*scale+'px'" :width="27*scale+'px'" viewBox="0 0 27 41">
          <g fill-rule="nonzero">
            <g transform="translate(3.0, 29.0)" fill="#000000">
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273">
              </ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273">
              </ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse>
              <ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse>
            </g>
            <g :fill="color">
              <path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z">
              </path>
            </g>
          <g opacity="0.25" fill="#000000">
            <path d="M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z">
            </path>
          </g>
          <g transform="translate(6.0, 7.0)" fill="#FFFFFF"></g><g transform="translate(8.0, 8.0)">
            <circle fill="#000000" opacity="0.25" cx="5.5" cy="5.5" r="5.4999962"></circle>
            <circle fill="#FFFFFF" cx="5.5" cy="5.5" r="5.4999962"></circle>
          </g>
        </g>
      </svg>
    </slot>
  </div>
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, provide, Ref, ref, watch, } from 'vue';
import { Marker, PointLike, Anchor, Alignment } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import injectMap from '../shared/map.inject';

import LngLatInput from '../classes/LngLatInput';
import { mountMarker, getMarkerOptions, updateMarker, registerMarkerEvents, MarkerEmits } from '../services/MapboxMarker';

export default defineComponent({
  name: 'MapboxMarker',
  emits: MarkerEmits,
  props: {
    lngLat: {
      default: () => [0,0] as LngLatInput,
    },
    offset: {
      type: [Array] as any as () => PointLike,
      default: () => [0,0] as [number, number],
    },
    anchor: {
      type: String as () => Anchor,
      default: () => 'left',
    },
    color: {
      type: String,
      default: '#4668F2',
    },
    scale: {
      type: Number,
      default: 1,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    pitchAlignment: {
      type: String as () => Alignment,
      default: 'auto',
    },
    rotationAlignment: {
      type: String as () => Alignment,
      default: 'auto',
    },
  },
  setup(props) {
    const { vmb_map } = injectMap.setup();
    const vmb_marker = new Deferred<Marker>();

    const icon = ref(null) as Ref<any | null>;

    const options = getMarkerOptions(props);
    
    provide('vmb_marker', vmb_marker);

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(instance && vmb_map){
        await mountMarker(options, vmb_map, vmb_marker, instance, props.lngLat, icon);
        const marker = await vmb_marker.promise;
        registerMarkerEvents(marker, instance);
      }
    });

    onUnmounted( async () => {
      const marker = await vmb_marker.promise;
      marker.remove();
    });    

    watch(props, async (p) => {
      await updateMarker(p, vmb_marker);
    });

    return { icon };
  },
});
</script>

function registerMarkerEvents(marker: any, instance: ComponentInternalInstance) {
  throw new Error('Function not implemented.');
}
