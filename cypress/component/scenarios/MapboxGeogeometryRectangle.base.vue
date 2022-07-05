<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-geogeometry-rectangle(
      :center="center"
      :height="height"
      :width="width"
      :rotation-deg="rotationDeg"
    )
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxGeogeometryRectangle } from '@/components';

export default defineComponent({
  name: 'MapboxGeogeometryRectangleBase',
  components: {
    MapboxMap, MapboxGeogeometryRectangle
  },
  props: {
    accessToken: { type: String, required: true },
    center: { type: Array },
    height: { type: Number },
    width: { type: Number },
    rotationDeg: { type: Number }
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