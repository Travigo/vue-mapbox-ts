<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-geogeometry-raw(
      :source="routeFeature"
    )
      mapbox-geogeometry-line(
        color="#0f0"
        :width="10"        
        :cap="cap"
        :join="join"
      )
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxGeogeometryCircle, MapboxGeogeometryLine, MapboxGeogeometryRaw } from '@/components';

export default defineComponent({
  name: 'MapboxGeogeometryCircleBase',
  components: {
    MapboxMap, MapboxGeogeometryRaw, MapboxGeogeometryLine
  },
  props: {
    accessToken: { type: String, required: true },
    join: { type: String, default: 'round' },
    cap: { type: String, default: 'cap' }
  },
  setup(props){

    const routeFeature = computed(() => ({
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            [1, 1],
            [8, 1],
            [8, 8],
            [1, 8],
          ]
        }
      }
    }));


    onMounted(async () => {

    });

    onUnmounted(async () => {

    });

    return {
      routeFeature
    };
  }
});
</script>

<style lang="scss" scoped>
#main{
  width: 400px;
  height: 300px;
}
</style>