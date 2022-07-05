<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-scale-control(:unit="unit")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxScaleControl } from '@/components';

export default defineComponent({
  name: 'MapboxScaleControlBase',
  components: {
    MapboxMap, MapboxScaleControl
  },
  props: {
    accessToken: { type: String, required: true },
    unit: { type: String, default: 'metric' } 
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