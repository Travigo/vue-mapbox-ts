<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-geogeometry-circle(
      :center="center"
      :radius="radius"
    )
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxGeogeometryCircle } from '@/components';

export default defineComponent({
  name: 'MapboxGeogeometryCircleBase',
  components: {
    MapboxMap, MapboxGeogeometryCircle
  },
  props: {
    accessToken: { type: String, required: true },
    center: { type: Array },
    radius: { type: Number }

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