<template>
<div>
  <div ref="icon">
    <slot name="icon" />
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
import { mountMarker, getMarkerOptions, updateMarker } from '../services/MapboxMarker';

export default defineComponent({
  name: 'MapboxMarker',
  emits: ['drag', 'dragend', 'dragstart', 'update:lngLat'],
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
      default: null,
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
      }
        
    });

    onUnmounted( async () => {
      const marker = await vmb_marker.promise;
      marker.remove();
    });    

    watch(props, async (p) => {
      await updateMarker(p, vmb_marker);
    });

    return { vmb_map, vmb_marker, options, icon };
  },
});
</script>
