<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { getFullscreenControlOptions, mountFullscreenControl } from '../services/MapboxFullscreenControl';
import Deferred from 'my-deferred';


export default defineComponent({
  name: 'MapboxFullscreenControl',
  props: {
    container: {
      type: Object as () => HTMLElement,
      default: undefined
    }
  },
  setup(props) {
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const options = getFullscreenControlOptions(props);
    const vmb_fullscreenControl = new mapboxgl.FullscreenControl(options);

    onMounted(async () => {
      if(vmb_map)
        await mountFullscreenControl(vmb_fullscreenControl, vmb_map);
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeControl(vmb_fullscreenControl);
      }      
    });
  }
});
</script>
