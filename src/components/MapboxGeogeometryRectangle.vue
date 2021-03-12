<template>
<div ref="features">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref, watch, } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Rectangle } from '../classes/GeogeometryRectangle';
import { updateRectangle } from '../services/MapboxGeogeometryRectangle';

let polygonsAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryRectangle',
  props: {
    id: {
      type: String,
      default: `rectangle-${polygonsAdded++}`
    },
    center: {
      type: Array as any as () => [number, number],
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
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
    const vmb_rectangle = new Rectangle({
      id: props.id,
      width: props.width,
      height: props.height,
      center: props.center,
      fillColor: props.fillColor,
      outlineColor: props.outlineColor,
      opacity: props.opacity,
      antialias: props.antialias
    });

    provide('vmb_rectangle', vmb_rectangle);

    onMounted(async () => {
      await updateRectangle(vmb_map, vmb_rectangle);
    });

    watch(props, async () => {
      vmb_rectangle.updateOptions(props);
      await updateRectangle(vmb_map, vmb_rectangle);
    });

    return {
      vmb_map,
      vmb_rectangle
    };
  }
});
</script>
