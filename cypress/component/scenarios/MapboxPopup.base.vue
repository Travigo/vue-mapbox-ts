<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken" :center="[0,0]")
    mapbox-popup(:lngLat="[0,0]")
      div Hello World
    
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxPopup } from '@/components';

export default defineComponent({
  name: 'MapboxPopupBase',
  components: {
    MapboxMap, MapboxPopup
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