<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-navigation-control(position="bottom-left")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxNavigationControl } from '@/components';

export default defineComponent({
  name: 'MapboxMapBase',
  components: {
    MapboxMap, MapboxNavigationControl
  },
  props: {
    accessToken: { type: String, required: true }
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