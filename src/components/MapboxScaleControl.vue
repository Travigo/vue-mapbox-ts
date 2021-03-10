<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, } from 'vue';
import mapboxgl, { FitBoundsOptions, Map, PositionOptions } from 'mapbox-gl';
import { ScaleControlUnit } from '../classes/ScaleControl';
import { getScaleControlOptions, mountScaleControl } from '../services/MapboxScaleControl';
import Deferred from 'my-deferred';


export default defineComponent({
  props: {
    maxWidth: {
      type: Number,
      default: 100
    },
    unit: {
      type: String as () => ScaleControlUnit,
      default: 'metric'
    }
  },
  setup(props) {
    const options = getScaleControlOptions(props);
    const vmb_scaleControl = new mapboxgl.ScaleControl(options);

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;

    onMounted(async () => {
      if(vmb_map)
        await mountScaleControl(vmb_map, vmb_scaleControl);
    });

    return {
      vmb_scaleControl,
      vmb_map
    };
  }
});
</script>
