<template lang="pug">
div#main
  mapbox-map(:accessToken="accessToken")
    mapbox-navigation-control(:position="position")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';

import { MapboxMap, MapboxNavigationControl } from '@/components';

export default defineComponent({
  name: 'MapboxNavigationControlBase',
  components: {
    MapboxMap, MapboxNavigationControl
  },
  props: {
    accessToken: { type: String, required: true },
    position: { type: String, default: 'bottom-left' } 
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