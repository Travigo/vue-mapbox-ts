<template>
<div ref="features">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, } from 'vue';
import { GeoJSONSource, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';


export default defineComponent({
  name: 'MapboxSourceGeoJson',
  props: {
    container: {
      type: Object as () => HTMLElement,
      default: undefined
    }
  },
  setup(props) {

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_source = new GeoJSONSource();

    onMounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.addSource;
      }      
    });

    return {
      vmb_map
    };
  }
});
</script>
