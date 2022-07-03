<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken" :center="[0,0]")
    mapbox-marker(:lngLat="[0,0]")
      mapbox-popup
        div I am attached to the marker
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxMarker, MapboxPopup } from '@/components';

export default defineComponent({
  name: 'MapboxMarkerPopup',
  components: {
    MapboxMap, MapboxMarker, MapboxPopup
  },
  props: {
    accessToken: { type: String, required: true },
    
  },
  setup(props){


    onMounted(async () => {

    });

    onUnmounted(async () => {

    });

    return {};
  }
});
</script>

<style lang="scss" scoped>
#main{
  width: 400px;
  height: 300px;
}
</style>