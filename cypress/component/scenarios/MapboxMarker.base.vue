<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken" :center="[0,0]")
    mapbox-marker(:lngLat="[0,0]" :draggable="draggable")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxMarker } from '@/components';

export default defineComponent({
  name: 'MapboxMarkerBase',
  components: {
    MapboxMap, MapboxMarker
  },
  props: {
    accessToken: { type: String, required: true },
    draggable: { type: Boolean, default: false }
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