<template>
<div ref="features">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref, watch, } from 'vue';
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

    const vmb_map = inject('vmb_map') as Deferred<Map>;
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
      await updatePolygon(vmb_map, vmb_polygon);
    });

    watch(props, async () => {
      vmb_polygon.updateOptions(props);
      await updatePolygon(vmb_map, vmb_polygon);
    });

    return {
      vmb_map,
      vmb_polygon
    };
  }
});
</script>
