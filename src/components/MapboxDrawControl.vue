<template>
<div />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, onUnmounted } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxDrawControl from '@mapbox/mapbox-gl-draw';
import { mountDrawControl, getDrawControlOptions } from '../services/MapboxDrawControl';
import Deferred from 'my-deferred';
import { NavigationControlPosition } from '../classes/NavigationControll';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export default defineComponent({
  name: 'MapboxDrawControl',
  props: {   
    position: {
      type: String as () => NavigationControlPosition,
      default: 'top-left'
    }
  },
  setup(props) {
    const opts = getDrawControlOptions(props);
    const vmb_drawControl = new MapboxDrawControl();

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    onMounted(async () => {
      const component = getCurrentInstance();
      if(vmb_map && component)
        mountDrawControl(vmb_map, vmb_drawControl, opts, component);
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeControl(vmb_drawControl);
      }      
    });

  }
});
</script>
