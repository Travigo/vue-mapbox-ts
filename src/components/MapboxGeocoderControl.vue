<template>
<div>
  <div ref="geocoder" v-show="showOriginalGeocoder" />
  <div ref="custom-input">
    <slot name="input"
      :result="geocoderState.result" 
      :results="geocoderState.results"
      :error="geocoderState.error"
      :loading="geocoderState.loading"
    />
  </div>
</div>
</template>

<script lang="ts">
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { defineComponent, Ref, inject, onMounted, watch, getCurrentInstance, onUnmounted, ref } from 'vue';
import MapboxGeocoder, { LngLatLiteral, Result, Results } from '@mapbox/mapbox-gl-geocoder';
import { FitBoundsOptions, FlyToOptions, Map } from 'mapbox-gl';

import Deferred from 'my-deferred/dist/src';

import { mountGeocoderControl, mountGeocoderEvents } from '../services/MapboxGeocoderControl';
import { FilterFunction, ExternalGeocoderFunction, RenderFunction, GetItemValueFunction, LocalGeocoderFunction } from '../classes/GeocoderControl';

export default defineComponent({
  name: 'MapboxGeocoderControl',
  props: {
    accessToken:        { type: String, default: '' },
    origin:             { type: String },
    zoom:               { type: Number },
    flyTo:              { type: [Boolean, Object] as any as () => boolean | FlyToOptions | FitBoundsOptions | undefined, default: () => undefined },
    placeholder:        { type: String },
    proximity:          { type: Object as () => LngLatLiteral },
    trackProximity:     { type: Boolean, default: () => undefined },    
    collapsed:          { type: Boolean, default: () => undefined },
    clearAndBlurOnEsc:  { type: Boolean, default: () => undefined },
    clearOnBlur:        { type: Boolean, default: () => undefined },
    bbox:               { type: Array as any as () => [number, number, number, number] },
    countries:          { type: String },
    types:              { type: String },
    minLength:          { type: Number },
    limit:              { type: Number },
    language:           { type: String },
    filter:             { type: Function as any as () => FilterFunction },
    localGeocoder:      { type: Function as any as () => LocalGeocoderFunction },
    externalGeocoder:   { type: Function as any as () => ExternalGeocoderFunction },
    // reverseMode:        { type: String as () => 'distance' | 'score' },
    reverseGeocode:     { type: Boolean, default: () => undefined },
    enableEventLogging: { type: Boolean, default: () => undefined },
    marker:             { type: Boolean, default: () => undefined },
    render:             { type: Function as any as () => RenderFunction },
    getItemValue:       { type: Function as any as () => GetItemValueFunction },
    mode:               { type: String as () =>'mapbox.places' | 'mapbox.places-permanent' },
    localGeocoderOnly:  { type: Boolean, default: () => undefined }
  },
  setup(props) {
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
  
    const vmb_geocoder = new Deferred<MapboxGeocoder>();
    const showOriginalGeocoder = ref(true);
    
    const geocoderState = ref({
      result: {} as Result,
      results: {} as Results,
      error: null as string | null,
      loading: null as string | null,
    }) as Ref<any>;

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(instance)
        await mountGeocoderControl(vmb_map, vmb_geocoder, props, instance);
      
      if(instance)
        await mountGeocoderEvents(vmb_geocoder, instance);

    });

    onUnmounted(async () => {
      const geocoder = await vmb_geocoder.promise;

      if(vmb_map){
        const map = await vmb_map.promise;
        if(!(map as any)._removed)
          map.removeControl(geocoder);
      }
      
    });

    watch(props, async () => {
    
    });

    return { showOriginalGeocoder, geocoderState };
  }
});
</script>