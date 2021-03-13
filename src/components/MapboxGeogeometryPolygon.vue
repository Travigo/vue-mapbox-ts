<template>
<div ref="features">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, provide, watch } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Polygon } from '../classes/GeogeometryPolygon';
import { updatePolygon } from '../services/MapboxGeogeometryPolygon';

let polygonsAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryPolygon',
  props: {
    id: {
      type: String,
      default: `polygon-${polygonsAdded++}`
    },
    path: {
      type: Array as any as () => Array<[number, number]>,
      required: true
    },
    fillColor: {
      type: String,
    },
    outlineColor: {
      type: String,      
    },
    opacity: {
      type: Number
    },
    antialias: {
      type: Boolean
    }
  },
  setup(props) {

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_polygon = new Polygon({
      id: props.id,
      path: props.path,
      fillColor: props.fillColor,
      outlineColor: props.outlineColor,
      opacity: props.opacity,
      antialias: props.antialias
    });

    provide('vmb_polygon', vmb_polygon);

    onMounted(async () => {
      if(vmb_map)
        await updatePolygon(vmb_map, vmb_polygon);
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(vmb_polygon.id);
      }      
    });

    watch(props, async () => {
      if(vmb_map){
        vmb_polygon.updateOptions(props);
        await updatePolygon(vmb_map, vmb_polygon);
      }      
    });

    return {
      vmb_map,
      vmb_polygon
    };
  }
});
</script>
