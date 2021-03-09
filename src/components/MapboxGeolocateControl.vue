<template lang="pug">
div
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref } from 'vue';
import mapboxgl, { FitBoundsOptions, LngLat, LngLatBounds, Map, MapboxOptions, PositionOptions } from 'mapbox-gl';
import { getGeolocationControlOptions } from '../services/MapboxGeolocationControl';
import Deferred from 'my-deferred';
import mountMap from '../services/MapboxMap.moutMap';
import { GeolocationControlOptions } from '../classes/GeolocationControl';


export default defineComponent({
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
    }
    
  },
  setup(props) {
    const vmb_map:Deferred<Map> = inject('vmb_map') as Deferred<Map>;
    const options = getGeolocationControlOptions(props);
    const vmb_geolocationControl = new mapboxgl.GeolocateControl(options);

    onMounted(async () => {
      const map = await vmb_map.promise;
      map.addControl(vmb_geolocationControl);
    });

    return {
      vmb_map,
      vmb_geolocationControl
    };
  }
});
</script>
