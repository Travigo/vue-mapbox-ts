<template>
<div />
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, } from 'vue';
import mapboxgl, { FitBoundsOptions, Map, PositionOptions } from 'mapbox-gl';
import { getGeolocationControlOptions } from '../services/MapboxGeolocationControl';
import Deferred from 'my-deferred';
import { NavigationControlPosition } from '../classes/NavigationControll';

export default defineComponent({
  name: 'MapboxGeolocateControl',
  props: {
    positionOptions: {
      type: Object as () => PositionOptions,
      default: () => ({ enableHighAccuracy: false, timeout: 6000 })
    },
    fitBoundsOptions: {
      type: Object as () => FitBoundsOptions,
      default: () => ({ maxZoom: 15 })
    },
    trackUserLocation: {
      type: Boolean,
      default: false
    },
    showAccuracyCircle: {
      type: Boolean,
      default: true
    },
    showUserLocation: {
      type: Boolean,
      default: true
    },
    position: {
      type: String as () => NavigationControlPosition,
      default: () => 'top-right'
    }
  },
  setup(props) {
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const options = getGeolocationControlOptions(props);
    const vmb_geolocationControl = new mapboxgl.GeolocateControl(options);
    const position = props.position; 

    onMounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.addControl(vmb_geolocationControl, position);
      }      
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeControl(vmb_geolocationControl);
      }      
    });
  }
});
</script>
