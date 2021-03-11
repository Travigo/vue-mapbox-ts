<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { getFullscreenControlOptions, mountFullscreenControl } from '@/services/MapboxFullscreenControl';
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
    const vmb_map = inject('vmb_map') as Deferred<Map>;
    const options = getFullscreenControlOptions(props);
    const vmb_fullscreenControl = new mapboxgl.FullscreenControl(options);

    onMounted(async () => {
      await mountFullscreenControl(vmb_fullscreenControl, vmb_map);
    });

    return {
      vmb_map,
      vmb_fullscreenControl
    };
  }
});
</script>
