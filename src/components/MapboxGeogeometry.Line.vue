<template>
<div />
</template>

<script lang="ts">
import { Geogeometry, GeogeometryType } from '../classes/Geogeometry';
import { defineComponent, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { Map, ImageSource, Visibility } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { GeogeometryLine, GeogeometryLineInput, TranslateAnchor } from '../classes/Geogeometry.Paint.Line';
import { filterObject } from '../services/VueHelpers';

export default defineComponent({
  name: 'MapboxGeogeometryLine',
  props: {
    blur: {
      type: Number
    },
    cap: {
      type: String as () => CanvasLineCap
    },
    join: {
      type: String as () => CanvasLineJoin
    },
    opacity: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#4668F2'
    },    
    width: {
      type: Number
    },
    translate: {
      type: Array as any as () => [number, number]
    },
    offset: {
      type: Number
    },
    dasharray: {
      type: Array as () => number[]
    },
    gapWidth: {
      type: Number
    },
    // gradient: {
    //   type: String
    // },
    // miterLimit: {
    //   type: Number
    // },
    // roundLimit: {
    //   type: Number
    // },
    // sortKey: {
    //   type: Number
    // },
    // translateAnchor: {
    //   type: String as () => TranslateAnchor
    // }
  },
  setup(props) {
    const vmb_geogeometry = inject('vmb_geogeometry', null) as Deferred<GeogeometryType> | null;
    const vmb_line = new Deferred<GeogeometryLine>();
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    
    provide('vmb_paint', vmb_line);

    if(!vmb_geogeometry)
      throw new Error('MapboxGeogeometryLine: no geogeometry found as parent');

    const line = new GeogeometryLine({ ...filterObject(props), geogeometry: vmb_geogeometry });

    onMounted(async () => {     
      if(vmb_map && vmb_geogeometry){
        await line.init();
        const map = await vmb_map.promise;
        const geogeometry = await vmb_geogeometry.promise;
        if(geogeometry && map){
          map.addLayer(line.getLayer());
          vmb_line.resolve(line);
        }  
      } 
          
    });

    watch(props, async () => {
      const line = await vmb_line.promise;    
      if(line && vmb_map)
        line.update(props, vmb_map);
    });

    onUnmounted(async () => {
      if(vmb_map && line.id){
        const map = await vmb_map.promise;
        map.removeLayer(line.id);
      }
    });

    return {
    };
  }
});
</script>
