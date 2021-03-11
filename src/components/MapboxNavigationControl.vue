<template>
<div />


</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref } from 'vue';
import mapboxgl, { LngLat, LngLatBounds, Map, MapboxOptions } from 'mapbox-gl';
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
    const vmb_map:Deferred<Map> = inject('vmb_map') as Deferred<Map>;
    const navOptions = getNavigationControlOptions(props);
    const vmb_navigationControl = new mapboxgl.NavigationControl(navOptions);
    const position = props.position; 

    onMounted(() => {
      mountNavigationControl(vmb_navigationControl, vmb_map, position);
    });

    return {
      vmb_map
    };
  }
});
</script>
