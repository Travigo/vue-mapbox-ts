<template>
<div ref="features">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref, watch, } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Circle } from '../classes/GeogeometryCircle';
import { updateCircle } from '../services/MapboxGeogeometryCircle';

let circlesAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryCircle',
  props: {
    id: {
      type: String,
      default: `circle-${circlesAdded++}`
    },
    center: {
      type: Array as any as () => [number, number],
      required: true
    },
    radius: {
      type: Number,
      required: true
    },
    edges: {
      type: Number,
      default: 10
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
    const vmb_circle = new Circle({
      id: props.id,
      radius: props.radius,
      center: props.center,
      edges: props.edges,
      fillColor: props.fillColor,
      outlineColor: props.outlineColor,
      opacity: props.opacity,
      antialias: props.antialias
    });

    provide('vmb_circle', vmb_circle);

    onMounted(async () => {
      await updateCircle(vmb_map, vmb_circle);
    });

    watch(props, async () => {
      vmb_circle.updateOptions(props);
      await updateCircle(vmb_map, vmb_circle);
    });

    return {
      vmb_map,
      vmb_circle
    };
  }
});
</script>