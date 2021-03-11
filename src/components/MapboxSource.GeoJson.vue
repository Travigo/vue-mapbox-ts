<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { getFullscreenControlOptions, mountFullscreenControl } from '../services/MapboxFullscreenControl';
import Deferred from 'my-deferred';


export default defineComponent({
  name: 'MapboxSourceGeoJson',
  props: {
    container: {
      type: Object as () => HTMLElement,
      default: undefined
    }
  },
  setup(props) {

    onMounted(async () => {
    });

    return {
    };
  }
});
</script>
