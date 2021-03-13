<template>
<div />


</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { getNavigationControlOptions, mountNavigationControl } from '../services/MapboxNavigationControl';
import Deferred from 'my-deferred';
import { NavigationControlPosition } from '../classes/NavigationControll';


export default defineComponent({
  name: 'MapboxNavigationControl',
  props: {
    showCompass: {
      type: Boolean,
      default: true
    },
    showZoom: {
      type: Boolean,
      default: true
    },
    visualizePitch: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as () => NavigationControlPosition,
      default: () => 'top-right'
    }
  },
  setup(props) {
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const navOptions = getNavigationControlOptions(props);
    const vmb_navigationControl = new mapboxgl.NavigationControl(navOptions);
    const position = props.position; 

    onMounted(() => {
      if(vmb_map)
        mountNavigationControl(vmb_navigationControl, vmb_map, position);
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeControl(vmb_navigationControl);
      }      
    });

    return {
      vmb_map
    };
  }
});
</script>
