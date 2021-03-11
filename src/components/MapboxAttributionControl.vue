<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { getAttributionControlOptions, mountAttributionControl } from '../services/MapboxAttributionControl';
import Deferred from 'my-deferred';


export default defineComponent({
  name: 'MapboxAttributionControl',
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    customAttribution: {
      type: [String, Array] as any as () => string | Array<string>,
      default: undefined
    }
    
  },
  setup(props) {
    const opts = getAttributionControlOptions(props);
    const vmb_attributionControl = new mapboxgl.AttributionControl(opts);

    const vmb_map = inject('vmb_map') as Deferred<Map> | undefined;

    onMounted(async () => {
      if(vmb_map)
        mountAttributionControl(vmb_map, vmb_attributionControl);
    });

    return {
      vmb_attributionControl,
      vmb_map
    };
  }
});
</script>
