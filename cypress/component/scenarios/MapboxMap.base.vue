<template>
  <div id="main">
    <mapbox-map :accessToken="accessToken" />
  </div>  
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