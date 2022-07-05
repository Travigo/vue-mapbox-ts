<template lang="pug">
div#main
  mapbox-map(
    :accessToken="accessToken"
    :projection="projection"
    :zoom="zoom"
    :center="center"
    :mapStyle="mapStyle"
  )
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap } from '@/components';

export default defineComponent({
  name: 'MapboxMapBase',
  components: {
    MapboxMap
  },
  props: {
    accessToken: { type: String, required: true },
    projection: { type: String },
    zoom: { type: Number },
    mapStyle: { type: String },
    center: { type: Array }
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