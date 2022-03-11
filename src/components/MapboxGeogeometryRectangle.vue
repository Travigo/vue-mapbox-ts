<template>
<div ref="features">
  <slot name="default">
    <mapbox-geogeometry-fill 
      :color="fillColor" 
      :outlineColor="outlineColor" 
      :opacity="opacity"
      :antialias="antialias"
    >
      <slot name="popup" />
    </mapbox-geogeometry-fill>
  </slot>
</div>
</template>

<script lang="ts">
import { Component, defineComponent, inject, onMounted, onUnmounted, provide, watch, } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Rectangle } from '../classes/GeogeometryRectangle';
import { mountGeogeometry, updateGeogeometry } from '../services/MapboxGeogeometry';
import { filterObject } from '../services/VueHelpers';

import MapboxGeogeometryFill from './MapboxGeogeometry.Fill.vue';

let rectanglesAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryRectangle',
  components: {
    // WORKAROUND FIX NEEDED BUT CURRENTLY DOES NOT COMPILE (MAYBE PROBLEM WITH DEFINECOMPONENTS RETURN TYPE)
    MapboxGeogeometryFill: MapboxGeogeometryFill as any as Component
  },
  props: {
    id: {
      type: String,
      default: 'rectangle'
    },
    center: {
      type: Array as any as () => [number, number],
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    fillColor: {
      type: String,
    },
    outlineColor: {
      type: String,      
    },
    opacity: {
      type: Number,
      default: 0.6
    },
    antialias: {
      type: Boolean,
      default: true
    },
    rotationDeg: {
      type: Number
    }
  },
  setup(props) {

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_rectangle = new Deferred<Rectangle>();
    const id = `${props.id}-${rectanglesAdded++}`;
    const rectangle = new Rectangle(filterObject({ ...props, id }, [
      'id',
      'width',
      'height',
      'center',
      'fillColor',
      'outlineColor',
      'opacity',
      'antialias',
      'rotationDeg'
    ]));

    provide('vmb_rectangle', vmb_rectangle);

    onMounted(async () => {
      if(vmb_map){
        await mountGeogeometry(vmb_map, rectangle);
        vmb_rectangle.resolve(rectangle);
        rectangle.deferred.resolve(rectangle);
      }
        
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(rectangle.id);
      }      
    });

    watch(props, async () => {
      if(vmb_map){
        await updateGeogeometry(props, vmb_map, rectangle);
      }      
    });
  }
});
</script>
