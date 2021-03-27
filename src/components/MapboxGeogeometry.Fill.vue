<template>
<div>
  <slot />
</div>
</template>

<script lang="ts">
import { Geogeometry, GeogeometryType } from '../classes/Geogeometry';
import { defineComponent, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { GeogeometryFill, GeogeometryFillInput } from '../classes/Geogeometry.Paint.Fill';
import { filterObject } from '../services/VueHelpers';

export default defineComponent({
  name: 'MapboxGeogeometryFill',
  props: {
    color: {
      type: String,
      default: '#4668F2'
    },
    antialias: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number,
      default: 0.6
    },
    outlineColor: {
      type: String
    }
  },
  setup(props) {
    const vmb_geogeometry = inject('vmb_geogeometry', null) as Deferred<GeogeometryType> | null;
    const vmb_fill = new Deferred<GeogeometryFill>();
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;

    if(!vmb_geogeometry)
      throw new Error('MapboxGeogeometryFill: no geogeometry found as parent');
    
    const fill = new GeogeometryFill({ ...filterObject(props), geogeometry: vmb_geogeometry });
    provide('vmb_fill', vmb_fill);

    onMounted(async () => {
      if(vmb_map && vmb_geogeometry){
        const map = await vmb_map.promise;
        const geogeometry = await vmb_geogeometry.promise;
        if(geogeometry && map){
          await fill.init();
          map.addLayer(fill.getLayer());
          vmb_fill.resolve(fill);
          fill.deferred.resolve(fill);
        }      
      }
      
    });

    watch(props, async () => {
      const fill = await vmb_fill.promise;    
      if(fill && vmb_map)
        fill.update(props, vmb_map);
    });

    onUnmounted(async () => {
      if(vmb_map && fill.id){
        const map = await vmb_map.promise;
        map.removeLayer(fill.id);
      }
    });

    return {
    };
  }
});
</script>
